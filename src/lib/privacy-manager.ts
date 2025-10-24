/**
 * Privacy Manager
 * 
 * Handles user privacy controls, data retention, and compliance.
 * Provides tools for data export, deletion, and consent management.
 */

import { secureStorage } from './secure-storage';
import { apiKeyManager } from './api-key-manager';

export interface PrivacySettings {
  dataRetention: number; // days
  allowAnalytics: boolean;
  allowCaching: boolean;
  allowDataSync: boolean;
  consentGiven: boolean;
  consentDate: number;
}

export interface DataExport {
  userData: any;
  apiKeys: any;
  preferences: any;
  cache: any;
  exportDate: number;
  version: string;
}

export interface DataRetentionPolicy {
  apiKeys: number; // days
  userContent: number; // days
  cache: number; // days
  analytics: number; // days
}

export class PrivacyManager {
  private readonly PRIVACY_SETTINGS_KEY = 'privacy_settings';
  private readonly CONSENT_KEY = 'user_consent';
  private readonly RETENTION_POLICY: DataRetentionPolicy = {
    apiKeys: 30,
    userContent: 90,
    cache: 7,
    analytics: 365
  };

  /**
   * Initialize privacy manager
   */
  async initialize(): Promise<void> {
    // Check if user has given consent
    const hasConsent = await this.hasUserConsent();
    
    if (!hasConsent) {
      await this.showConsentDialog();
    }
  }

  /**
   * Check if user has given consent
   */
  async hasUserConsent(): Promise<boolean> {
    try {
      const consent = await secureStorage.getItem<{
        given: boolean;
        date: number;
        version: string;
      }>(this.CONSENT_KEY, false);
      
      return consent?.given === true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Record user consent
   */
  async recordConsent(consent: boolean, settings: Partial<PrivacySettings> = {}): Promise<void> {
    try {
      const consentData = {
        given: consent,
        date: Date.now(),
        version: '1.0'
      };

      await secureStorage.setItem(this.CONSENT_KEY, consentData, false);

      if (consent) {
        const privacySettings: PrivacySettings = {
          dataRetention: 90,
          allowAnalytics: settings.allowAnalytics ?? true,
          allowCaching: settings.allowCaching ?? true,
          allowDataSync: settings.allowDataSync ?? false,
          consentGiven: true,
          consentDate: Date.now()
        };

        await secureStorage.setItem(this.PRIVACY_SETTINGS_KEY, privacySettings, false);
      }
    } catch (error) {
      console.error('Failed to record consent:', error);
    }
  }

  /**
   * Get privacy settings
   */
  async getPrivacySettings(): Promise<PrivacySettings | null> {
    try {
      return await secureStorage.getItem<PrivacySettings>(this.PRIVACY_SETTINGS_KEY, false);
    } catch (error) {
      console.error('Failed to get privacy settings:', error);
      return null;
    }
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(settings: Partial<PrivacySettings>): Promise<void> {
    try {
      const currentSettings = await this.getPrivacySettings();
      const updatedSettings = {
        ...currentSettings,
        ...settings
      };

      await secureStorage.setItem(this.PRIVACY_SETTINGS_KEY, updatedSettings, false);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  }

  /**
   * Export all user data
   */
  async exportUserData(): Promise<DataExport> {
    try {
      const userData = await this.collectUserData();
      const apiKeys = await this.collectAPIKeys();
      const preferences = await this.collectPreferences();
      const cache = await this.collectCache();

      return {
        userData,
        apiKeys,
        preferences,
        cache,
        exportDate: Date.now(),
        version: '1.0'
      };
    } catch (error) {
      console.error('Failed to export user data:', error);
      throw new Error('Data export failed');
    }
  }

  /**
   * Delete all user data
   */
  async deleteAllUserData(): Promise<void> {
    try {
      // Clear all stored data
      await secureStorage.clear();
      
      // Clear API keys
      await apiKeyManager.clearAPIKey('openai');
      await apiKeyManager.clearAPIKey('anthropic');
      await apiKeyManager.clearAPIKey('custom');
      
      // Clear localStorage items
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('promptboard_')) {
          localStorage.removeItem(key);
        }
      });

      console.log('All user data deleted');
    } catch (error) {
      console.error('Failed to delete user data:', error);
      throw new Error('Data deletion failed');
    }
  }

  /**
   * Clean up expired data
   */
  async cleanupExpiredData(): Promise<void> {
    try {
      const settings = await this.getPrivacySettings();
      if (!settings) return;

      const now = Date.now();
      const retentionPeriod = settings.dataRetention * 24 * 60 * 60 * 1000;

      // Clean up old cache entries
      await this.cleanupCache(retentionPeriod);
      
      // Clean up old API keys
      await this.cleanupAPIKeys(retentionPeriod);
      
      // Clean up old user content
      await this.cleanupUserContent(retentionPeriod);

      console.log('Expired data cleanup completed');
    } catch (error) {
      console.error('Failed to cleanup expired data:', error);
    }
  }

  /**
   * Get data retention statistics
   */
  async getDataRetentionStats(): Promise<{
    totalItems: number;
    expiredItems: number;
    nextCleanup: number;
    retentionPolicy: DataRetentionPolicy;
  }> {
    try {
      const stats = await secureStorage.getStorageStats();
      const settings = await this.getPrivacySettings();
      
      const retentionPeriod = (settings?.dataRetention || 90) * 24 * 60 * 60 * 1000;
      const expiredItems = stats.totalItems - stats.sensitiveItems;
      const nextCleanup = stats.oldestItem + retentionPeriod;

      return {
        totalItems: stats.totalItems,
        expiredItems,
        nextCleanup,
        retentionPolicy: this.RETENTION_POLICY
      };
    } catch (error) {
      console.error('Failed to get retention stats:', error);
      return {
        totalItems: 0,
        expiredItems: 0,
        nextCleanup: 0,
        retentionPolicy: this.RETENTION_POLICY
      };
    }
  }

  /**
   * Show consent dialog
   */
  private async showConsentDialog(): Promise<void> {
    // This would typically show a UI dialog
    // For now, we'll just log the requirement
    console.log('User consent required for data processing');
  }

  /**
   * Collect user data for export
   */
  private async collectUserData(): Promise<any> {
    try {
      // Collect all user-generated content
      const userData = {
        logicFlows: [],
        prompts: [],
        preferences: await this.getPrivacySettings(),
        createdAt: Date.now()
      };

      return userData;
    } catch (error) {
      console.error('Failed to collect user data:', error);
      return {};
    }
  }

  /**
   * Collect API keys for export (without actual keys)
   */
  private async collectAPIKeys(): Promise<any> {
    try {
      const openaiInfo = await apiKeyManager.getAPIKeyInfo('openai');
      const anthropicInfo = await apiKeyManager.getAPIKeyInfo('anthropic');
      const customInfo = await apiKeyManager.getAPIKeyInfo('custom');

      return {
        openai: openaiInfo ? { ...openaiInfo, key: '[REDACTED]' } : null,
        anthropic: anthropicInfo ? { ...anthropicInfo, key: '[REDACTED]' } : null,
        custom: customInfo ? { ...customInfo, key: '[REDACTED]' } : null
      };
    } catch (error) {
      console.error('Failed to collect API keys:', error);
      return {};
    }
  }

  /**
   * Collect preferences for export
   */
  private async collectPreferences(): Promise<any> {
    try {
      const settings = await this.getPrivacySettings();
      return {
        privacy: settings,
        theme: 'light', // This would come from theme context
        language: 'en', // This would come from i18n context
        exportDate: Date.now()
      };
    } catch (error) {
      console.error('Failed to collect preferences:', error);
      return {};
    }
  }

  /**
   * Collect cache for export
   */
  private async collectCache(): Promise<any> {
    try {
      const stats = await secureStorage.getStorageStats();
      return {
        totalItems: stats.totalItems,
        sensitiveItems: stats.sensitiveItems,
        totalSize: stats.totalSize,
        oldestItem: stats.oldestItem,
        exportDate: Date.now()
      };
    } catch (error) {
      console.error('Failed to collect cache:', error);
      return {};
    }
  }

  /**
   * Clean up cache entries
   */
  private async cleanupCache(retentionPeriod: number): Promise<void> {
    try {
      const now = Date.now();
      const keys = Object.keys(localStorage);
      const prefix = 'promptboard_ai_cache_';
      
      for (const key of keys) {
        if (key.startsWith(prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp && now - parsed.timestamp > retentionPeriod) {
                localStorage.removeItem(key);
              }
            } catch (error) {
              // Not a valid cache item, remove it
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    }
  }

  /**
   * Clean up API keys
   */
  private async cleanupAPIKeys(retentionPeriod: number): Promise<void> {
    try {
      const openaiInfo = await apiKeyManager.getAPIKeyInfo('openai');
      const anthropicInfo = await apiKeyManager.getAPIKeyInfo('anthropic');
      const customInfo = await apiKeyManager.getAPIKeyInfo('custom');

      const now = Date.now();
      
      if (openaiInfo?.expiresAt && now > openaiInfo.expiresAt) {
        await apiKeyManager.clearAPIKey('openai');
      }
      
      if (anthropicInfo?.expiresAt && now > anthropicInfo.expiresAt) {
        await apiKeyManager.clearAPIKey('anthropic');
      }
      
      if (customInfo?.expiresAt && now > customInfo.expiresAt) {
        await apiKeyManager.clearAPIKey('custom');
      }
    } catch (error) {
      console.error('Failed to cleanup API keys:', error);
    }
  }

  /**
   * Clean up user content
   */
  private async cleanupUserContent(retentionPeriod: number): Promise<void> {
    try {
      // This would clean up user-generated content
      // For now, we'll just log the action
      console.log('User content cleanup would happen here');
    } catch (error) {
      console.error('Failed to cleanup user content:', error);
    }
  }
}

// Export singleton instance
export const privacyManager = new PrivacyManager();
