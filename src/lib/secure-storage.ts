/**
 * Secure Storage Service
 * 
 * Provides encrypted storage for sensitive data like API keys and user content.
 * Uses AES-256 encryption with PBKDF2 key derivation for maximum security.
 */

import { AI_SYSTEM_CONFIG } from './ai-config';

export interface SecureStorageConfig {
  encryptionAlgorithm: string;
  keyDerivationAlgorithm: string;
  saltLength: number;
  keyLength: number;
  iterations: number;
}

export interface StoredData {
  encrypted: string;
  iv: string;
  salt: string;
  timestamp: number;
  ttl?: number;
}

export class SecureStorage {
  private config: SecureStorageConfig;
  private masterKey: string | null = null;

  constructor() {
    this.config = {
      encryptionAlgorithm: 'AES-GCM',
      keyDerivationAlgorithm: 'PBKDF2',
      saltLength: 16,
      keyLength: 32,
      iterations: 100000
    };
  }

  /**
   * Initialize secure storage with user-specific key
   */
  async initialize(userKey?: string): Promise<void> {
    if (userKey) {
      this.masterKey = userKey;
    } else {
      // Generate anonymous user key
      this.masterKey = await this.generateAnonymousKey();
    }
  }

  /**
   * Store data with encryption
   */
  async setItem(key: string, value: any, sensitive: boolean = false, ttl?: number): Promise<void> {
    try {
      const storageKey = this.getStorageKey(key);
      
      if (sensitive) {
        if (!this.masterKey) {
          throw new Error('Secure storage not initialized');
        }
        
        const encrypted = await this.encrypt(JSON.stringify(value), this.masterKey);
        const data: StoredData = {
          encrypted: encrypted.data,
          iv: encrypted.iv,
          salt: encrypted.salt,
          timestamp: Date.now(),
          ttl: ttl
        };
        
        localStorage.setItem(storageKey, JSON.stringify(data));
      } else {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Failed to store data:', error);
      throw new Error('Storage operation failed');
    }
  }

  /**
   * Retrieve data with decryption
   */
  async getItem<T>(key: string, sensitive: boolean = false): Promise<T | null> {
    try {
      const storageKey = this.getStorageKey(key);
      const stored = localStorage.getItem(storageKey);
      
      if (!stored) {
        return null;
      }

      if (sensitive) {
        if (!this.masterKey) {
          throw new Error('Secure storage not initialized');
        }

        const data: StoredData = JSON.parse(stored);
        
        // Check TTL
        if (data.ttl && Date.now() - data.timestamp > data.ttl) {
          await this.removeItem(key);
          return null;
        }

        const decrypted = await this.decrypt(data.encrypted, data.iv, data.salt, this.masterKey);
        return JSON.parse(decrypted);
      } else {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to retrieve data:', error);
      return null;
    }
  }

  /**
   * Remove stored data
   */
  async removeItem(key: string): Promise<void> {
    const storageKey = this.getStorageKey(key);
    localStorage.removeItem(storageKey);
  }

  /**
   * Clear all stored data
   */
  async clear(): Promise<void> {
    const keys = Object.keys(localStorage);
    const prefix = AI_SYSTEM_CONFIG.caching.storage.keyPrefix;
    
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Check if data exists
   */
  async hasItem(key: string): Promise<boolean> {
    const storageKey = this.getStorageKey(key);
    return localStorage.getItem(storageKey) !== null;
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<{
    totalItems: number;
    sensitiveItems: number;
    totalSize: number;
    oldestItem: number;
  }> {
    const keys = Object.keys(localStorage);
    const prefix = AI_SYSTEM_CONFIG.caching.storage.keyPrefix;
    const appKeys = keys.filter(key => key.startsWith(prefix));
    
    let sensitiveItems = 0;
    let totalSize = 0;
    let oldestItem = Date.now();

    for (const key of appKeys) {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
        
        try {
          const parsed = JSON.parse(item);
          if (parsed.encrypted) {
            sensitiveItems++;
            if (parsed.timestamp < oldestItem) {
              oldestItem = parsed.timestamp;
            }
          }
        } catch (error) {
          // Not encrypted data
        }
      }
    }

    return {
      totalItems: appKeys.length,
      sensitiveItems,
      totalSize,
      oldestItem
    };
  }

  /**
   * Encrypt data using AES-GCM
   */
  private async encrypt(data: string, key: string): Promise<{
    data: string;
    iv: string;
    salt: string;
  }> {
    const salt = crypto.getRandomValues(new Uint8Array(this.config.saltLength));
    const derivedKey = await this.deriveKey(key, salt);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encodedData = new TextEncoder().encode(data);
    const encrypted = await crypto.subtle.encrypt(
      { name: this.config.encryptionAlgorithm, iv },
      derivedKey,
      encodedData
    );

    return {
      data: this.arrayBufferToBase64(encrypted),
      iv: this.arrayBufferToBase64(iv),
      salt: this.arrayBufferToBase64(salt)
    };
  }

  /**
   * Decrypt data using AES-GCM
   */
  private async decrypt(
    encryptedData: string,
    iv: string,
    salt: string,
    key: string
  ): Promise<string> {
    const derivedKey = await this.deriveKey(key, this.base64ToArrayBuffer(salt));
    const decrypted = await crypto.subtle.decrypt(
      { name: this.config.encryptionAlgorithm, iv: this.base64ToArrayBuffer(iv) },
      derivedKey,
      this.base64ToArrayBuffer(encryptedData)
    );

    return new TextDecoder().decode(decrypted);
  }

  /**
   * Derive key using PBKDF2
   */
  private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.config.iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.config.encryptionAlgorithm, length: this.config.keyLength * 8 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Generate anonymous user key
   */
  private async generateAnonymousKey(): Promise<string> {
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    return this.arrayBufferToBase64(randomBytes);
  }

  /**
   * Get storage key with prefix
   */
  private getStorageKey(key: string): string {
    return `${AI_SYSTEM_CONFIG.caching.storage.keyPrefix}${key}`;
  }

  /**
   * Convert ArrayBuffer to Base64
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert Base64 to ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

// Export singleton instance
export const secureStorage = new SecureStorage();
