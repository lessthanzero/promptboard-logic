/**
 * Telemetry Service
 * 
 * Privacy-first telemetry and analytics service for PromptBoard.
 * Provides comprehensive monitoring while maintaining user privacy and security.
 */

export interface TelemetryEvent {
  event: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface UserInteractionEvent extends TelemetryEvent {
  event: 'button_click' | 'node_create' | 'node_edit' | 'node_delete' | 'edge_create' | 'edge_delete';
  element: string;
  metadata?: {
    nodeType?: 'condition' | 'action' | 'outcome';
    edgeType?: 'yes' | 'no' | 'default';
    canvasPosition?: { x: number; y: number };
    zoomLevel?: number;
  };
}

export interface PerformanceEvent extends TelemetryEvent {
  event: 'page_load' | 'api_response' | 'render_time' | 'memory_usage' | 'bundle_size';
  value: number;
  unit: 'ms' | 'mb' | 'kb';
  metadata?: {
    route?: string;
    component?: string;
    apiEndpoint?: string;
    responseSize?: number;
    cacheHit?: boolean;
  };
}

export interface ErrorEvent extends TelemetryEvent {
  event: 'javascript_error' | 'api_error' | 'validation_error' | 'security_error';
  error: string;
  stack?: string;
  component?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: {
    userAgent?: string;
    browser?: string;
    os?: string;
    viewport?: { width: number; height: number };
    networkType?: string;
  };
}

export interface ProductAnalyticsEvent extends TelemetryEvent {
  event: 'logic_created' | 'logic_modified' | 'logic_executed' | 'logic_exported' | 'feature_used';
  metadata?: {
    nodeCount?: number;
    edgeCount?: number;
    complexity?: 'simple' | 'medium' | 'complex';
    nodeTypes?: string[];
    executionTime?: number;
    successRate?: number;
    featureName?: string;
    duration?: number;
  };
}

export interface SecurityEvent extends TelemetryEvent {
  event: 'api_key_stored' | 'api_key_used' | 'data_exported' | 'data_deleted' | 'encryption_failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: {
    keyProvider?: 'openai' | 'anthropic' | 'custom';
    dataType?: 'api_key' | 'user_content' | 'preferences';
    encryptionMethod?: 'AES-256-GCM' | 'PBKDF2';
    dataSize?: number;
  };
}

export interface PrivacyEvent extends TelemetryEvent {
  event: 'consent_given' | 'consent_withdrawn' | 'data_retention_cleanup' | 'privacy_settings_changed';
  metadata?: {
    consentVersion?: string;
    retentionPeriod?: number;
    dataTypes?: string[];
    settingsChanged?: string[];
  };
}

export interface TelemetryConsent {
  analytics: boolean;
  performance: boolean;
  errors: boolean;
  userInteractions: boolean;
  productAnalytics: boolean;
  security: boolean;
  privacy: boolean;
}

export class TelemetryService {
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;
  private queue: TelemetryEvent[];
  private batchSize: number;
  private flushInterval: number;
  private flushTimer?: NodeJS.Timeout;
  private consent: TelemetryConsent;
  private anonymizer: DataAnonymizer;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.consent = this.loadConsent();
    this.isEnabled = this.checkTelemetryConsent();
    this.queue = [];
    this.batchSize = 10;
    this.flushInterval = 30000; // 30 seconds
    this.anonymizer = new DataAnonymizer();

    // Start periodic flushing
    this.startPeriodicFlush();
  }

  /**
   * Track user interactions
   */
  trackUserInteraction(event: Omit<UserInteractionEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.userInteractions) return;

    const telemetryEvent: UserInteractionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Track performance metrics
   */
  trackPerformance(event: Omit<PerformanceEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.performance) return;

    const telemetryEvent: PerformanceEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Track errors
   */
  trackError(event: Omit<ErrorEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.errors) return;

    const telemetryEvent: ErrorEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Track product analytics
   */
  trackProductAnalytics(event: Omit<ProductAnalyticsEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.productAnalytics) return;

    const telemetryEvent: ProductAnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Track security events
   */
  trackSecurity(event: Omit<SecurityEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.security) return;

    const telemetryEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Track privacy events
   */
  trackPrivacy(event: Omit<PrivacyEvent, 'timestamp' | 'sessionId' | 'userId'>): void {
    if (!this.isEnabled || !this.consent.privacy) return;

    const telemetryEvent: PrivacyEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.queue.push(telemetryEvent);
    this.flushIfNeeded();
  }

  /**
   * Update telemetry consent
   */
  updateConsent(consent: Partial<TelemetryConsent>): void {
    this.consent = { ...this.consent, ...consent };
    this.saveConsent();
    this.isEnabled = this.checkTelemetryConsent();
  }

  /**
   * Get current consent settings
   */
  getConsent(): TelemetryConsent {
    return { ...this.consent };
  }

  /**
   * Check if telemetry is enabled
   */
  isTelemetryEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Flush all pending events
   */
  async flush(): Promise<void> {
    await this.flushEvents();
  }

  /**
   * Clear all telemetry data
   */
  clear(): void {
    this.queue = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get user ID (anonymous)
   */
  private getUserId(): string | undefined {
    const stored = localStorage.getItem('promptboard_user_id');
    if (stored) {
      return stored;
    }

    // Generate anonymous user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('promptboard_user_id', userId);
    return userId;
  }

  /**
   * Load telemetry consent
   */
  private loadConsent(): TelemetryConsent {
    const stored = localStorage.getItem('promptboard_telemetry_consent');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse telemetry consent:', error);
      }
    }

    // Default consent (privacy-first)
    return {
      analytics: false,
      performance: true,
      errors: true,
      userInteractions: false,
      productAnalytics: false,
      security: true,
      privacy: true
    };
  }

  /**
   * Save telemetry consent
   */
  private saveConsent(): void {
    localStorage.setItem('promptboard_telemetry_consent', JSON.stringify(this.consent));
  }

  /**
   * Check if telemetry is enabled
   */
  private checkTelemetryConsent(): boolean {
    return Object.values(this.consent).some(enabled => enabled);
  }

  /**
   * Flush events if queue is full
   */
  private flushIfNeeded(): void {
    if (this.queue.length >= this.batchSize) {
      this.flushEvents();
    }
  }

  /**
   * Start periodic flushing
   */
  private startPeriodicFlush(): void {
    this.flushTimer = setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
  }

  /**
   * Stop periodic flushing
   */
  private stopPeriodicFlush(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }
  }

  /**
   * Flush events to server
   */
  private async flushEvents(): Promise<void> {
    if (this.queue.length === 0) return;

    const events = this.queue.splice(0, this.batchSize);
    const anonymizedEvents = events.map(event => this.anonymizer.anonymize(event));

    try {
      await this.sendToServer(anonymizedEvents);
    } catch (error) {
      console.error('Failed to send telemetry events:', error);
      // Re-queue events for retry
      this.queue.unshift(...events);
    }
  }

  /**
   * Send events to server
   */
  private async sendToServer(events: TelemetryEvent[]): Promise<void> {
    // In a real implementation, this would send to your analytics server
    // For now, we'll just log the events
    console.log('Telemetry events:', events);

    // Simulate server response
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Cleanup on destroy
   */
  destroy(): void {
    this.stopPeriodicFlush();
    this.flushEvents();
  }
}

/**
 * Data Anonymizer
 * 
 * Anonymizes sensitive data for telemetry
 */
class DataAnonymizer {
  /**
   * Anonymize telemetry data
   */
  anonymize(data: any): any {
    const anonymized = { ...data };

    // Remove PII
    delete anonymized.email;
    delete anonymized.name;
    delete anonymized.ip;

    // Hash user IDs
    if (anonymized.userId) {
      anonymized.userId = this.hash(anonymized.userId);
    }

    // Hash session IDs
    if (anonymized.sessionId) {
      anonymized.sessionId = this.hash(anonymized.sessionId);
    }

    // Anonymize metadata
    if (anonymized.metadata) {
      anonymized.metadata = this.anonymizeMetadata(anonymized.metadata);
    }

    return anonymized;
  }

  /**
   * Anonymize metadata
   */
  private anonymizeMetadata(metadata: any): any {
    const anonymized = { ...metadata };

    // Remove sensitive metadata
    delete anonymized.email;
    delete anonymized.name;
    delete anonymized.ip;

    // Hash sensitive IDs
    if (anonymized.userId) {
      anonymized.userId = this.hash(anonymized.userId);
    }

    return anonymized;
  }

  /**
   * Hash sensitive data
   */
  private hash(data: string): string {
    // Simple hash for demo purposes
    // In production, use crypto.subtle.digest
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}

// Export singleton instance
export const telemetryService = new TelemetryService();
