/**
 * API Key Manager
 * 
 * Handles secure storage, validation, and management of API keys.
 * Provides encryption, expiration, and access control for sensitive keys.
 */

import { secureStorage } from './secure-storage';

export interface APIKeyInfo {
  key: string;
  provider: 'openai' | 'anthropic' | 'custom';
  createdAt: number;
  expiresAt?: number;
  lastUsed?: number;
  isActive: boolean;
}

export interface APIKeyValidation {
  isValid: boolean;
  provider: string;
  error?: string;
}

export class APIKeyManager {
  private readonly STORAGE_KEY = 'api_keys';
  private readonly EXPIRATION_DAYS = 30;

  /**
   * Store API key securely
   */
  async storeAPIKey(key: string, provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<void> {
    try {
      // Validate key format
      const validation = await this.validateAPIKey(key, provider);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid API key format');
      }

      // Create key info
      const keyInfo: APIKeyInfo = {
        key,
        provider,
        createdAt: Date.now(),
        expiresAt: Date.now() + (this.EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
        isActive: true
      };

      // Store encrypted
      await secureStorage.setItem(this.STORAGE_KEY, keyInfo, true);
      
      // Log successful storage
      console.log(`API key stored for provider: ${provider}`);
    } catch (error) {
      console.error('Failed to store API key:', error);
      throw new Error('Failed to store API key securely');
    }
  }

  /**
   * Retrieve API key
   */
  async getAPIKey(provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<string | null> {
    try {
      const keyInfo = await secureStorage.getItem<APIKeyInfo>(this.STORAGE_KEY, true);
      
      if (!keyInfo) {
        return null;
      }

      // Check if key is for the requested provider
      if (keyInfo.provider !== provider) {
        return null;
      }

      // Check if key is active
      if (!keyInfo.isActive) {
        return null;
      }

      // Check expiration
      if (keyInfo.expiresAt && Date.now() > keyInfo.expiresAt) {
        await this.clearAPIKey(provider);
        return null;
      }

      // Update last used timestamp
      await this.updateLastUsed(provider);

      return keyInfo.key;
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  }

  /**
   * Clear API key
   */
  async clearAPIKey(provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<void> {
    try {
      const keyInfo = await secureStorage.getItem<APIKeyInfo>(this.STORAGE_KEY, true);
      
      if (keyInfo && keyInfo.provider === provider) {
        await secureStorage.removeItem(this.STORAGE_KEY);
        console.log(`API key cleared for provider: ${provider}`);
      }
    } catch (error) {
      console.error('Failed to clear API key:', error);
    }
  }

  /**
   * Check if API key exists
   */
  async hasAPIKey(provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<boolean> {
    const key = await this.getAPIKey(provider);
    return key !== null;
  }

  /**
   * Get API key info (without the actual key)
   */
  async getAPIKeyInfo(provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<Partial<APIKeyInfo> | null> {
    try {
      const keyInfo = await secureStorage.getItem<APIKeyInfo>(this.STORAGE_KEY, true);
      
      if (!keyInfo || keyInfo.provider !== provider) {
        return null;
      }

      // Return info without the actual key
      return {
        provider: keyInfo.provider,
        createdAt: keyInfo.createdAt,
        expiresAt: keyInfo.expiresAt,
        lastUsed: keyInfo.lastUsed,
        isActive: keyInfo.isActive
      };
    } catch (error) {
      console.error('Failed to get API key info:', error);
      return null;
    }
  }

  /**
   * Validate API key format
   */
  async validateAPIKey(key: string, provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<APIKeyValidation> {
    try {
      switch (provider) {
        case 'openai':
          return this.validateOpenAIKey(key);
        case 'anthropic':
          return this.validateAnthropicKey(key);
        case 'custom':
          return this.validateCustomKey(key);
        default:
          return {
            isValid: false,
            provider: 'unknown',
            error: 'Unknown provider'
          };
      }
    } catch (error) {
      return {
        isValid: false,
        provider,
        error: 'Validation failed'
      };
    }
  }

  /**
   * Test API key by making a test request
   */
  async testAPIKey(key: string, provider: 'openai' | 'anthropic' | 'custom' = 'openai'): Promise<boolean> {
    try {
      switch (provider) {
        case 'openai':
          return await this.testOpenAIKey(key);
        case 'anthropic':
          return await this.testAnthropicKey(key);
        case 'custom':
          return true; // Custom keys can't be tested
        default:
          return false;
      }
    } catch (error) {
      console.error('API key test failed:', error);
      return false;
    }
  }

  /**
   * Update last used timestamp
   */
  private async updateLastUsed(provider: 'openai' | 'anthropic' | 'custom'): Promise<void> {
    try {
      const keyInfo = await secureStorage.getItem<APIKeyInfo>(this.STORAGE_KEY, true);
      
      if (keyInfo && keyInfo.provider === provider) {
        keyInfo.lastUsed = Date.now();
        await secureStorage.setItem(this.STORAGE_KEY, keyInfo, true);
      }
    } catch (error) {
      console.error('Failed to update last used timestamp:', error);
    }
  }

  /**
   * Validate OpenAI API key format
   */
  private validateOpenAIKey(key: string): APIKeyValidation {
    // OpenAI keys start with 'sk-' and are 51 characters long
    const openaiPattern = /^sk-[a-zA-Z0-9]{48}$/;
    
    if (!openaiPattern.test(key)) {
      return {
        isValid: false,
        provider: 'openai',
        error: 'Invalid OpenAI API key format. Should start with "sk-" and be 51 characters long.'
      };
    }

    return {
      isValid: true,
      provider: 'openai'
    };
  }

  /**
   * Validate Anthropic API key format
   */
  private validateAnthropicKey(key: string): APIKeyValidation {
    // Anthropic keys start with 'sk-ant-' and are longer
    const anthropicPattern = /^sk-ant-[a-zA-Z0-9]{32,}$/;
    
    if (!anthropicPattern.test(key)) {
      return {
        isValid: false,
        provider: 'anthropic',
        error: 'Invalid Anthropic API key format. Should start with "sk-ant-" and be at least 32 characters long.'
      };
    }

    return {
      isValid: true,
      provider: 'anthropic'
    };
  }

  /**
   * Validate custom API key format
   */
  private validateCustomKey(key: string): APIKeyValidation {
    // Custom keys should be at least 16 characters
    if (key.length < 16) {
      return {
        isValid: false,
        provider: 'custom',
        error: 'Custom API key should be at least 16 characters long.'
      };
    }

    return {
      isValid: true,
      provider: 'custom'
    };
  }

  /**
   * Test OpenAI API key
   */
  private async testOpenAIKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Test Anthropic API key
   */
  private async testAnthropicKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 10,
          messages: [
            {
              role: 'user',
              content: 'Hello'
            }
          ]
        })
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<{
    hasKeys: boolean;
    providers: string[];
    totalSize: number;
    oldestKey: number;
  }> {
    try {
      const stats = await secureStorage.getStorageStats();
      const keyInfo = await secureStorage.getItem<APIKeyInfo>(this.STORAGE_KEY, true);
      
      return {
        hasKeys: !!keyInfo,
        providers: keyInfo ? [keyInfo.provider] : [],
        totalSize: stats.totalSize,
        oldestKey: keyInfo?.createdAt || 0
      };
    } catch (error) {
      console.error('Failed to get storage stats:', error);
      return {
        hasKeys: false,
        providers: [],
        totalSize: 0,
        oldestKey: 0
      };
    }
  }
}

// Export singleton instance
export const apiKeyManager = new APIKeyManager();
