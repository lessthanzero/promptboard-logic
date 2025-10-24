# Security Architecture & Data Storage

## Overview
This document outlines the security architecture for PromptBoard, including secure storage of API keys, user data, and sensitive information.

## Security Principles

### 1. Defense in Depth
- Multiple layers of security controls
- Client-side and server-side protection
- Encryption at rest and in transit
- Access controls and authentication

### 2. Data Minimization
- Store only necessary data
- Implement data retention policies
- Regular cleanup of sensitive information
- User control over data deletion

### 3. Privacy by Design
- User consent for data collection
- Transparent data usage policies
- Local-first approach where possible
- Minimal external dependencies

## Storage Architecture

### Client-Side Storage (Browser)

#### 1. API Key Storage
```typescript
// Secure API key storage with encryption
interface SecureStorage {
  apiKey: string;           // Encrypted OpenAI API key
  userId: string;           // Anonymous user identifier
  preferences: UserPrefs;   // UI preferences and settings
  cache: AICache;          // Encrypted AI response cache
}
```

**Security Measures:**
- **Encryption**: AES-256 encryption for sensitive data
- **Key Derivation**: PBKDF2 with user-specific salt
- **Storage Location**: localStorage with fallback to sessionStorage
- **Expiration**: Configurable TTL for cached data
- **Access Control**: Same-origin policy enforcement

#### 2. User Data Classification
```typescript
// Data sensitivity levels
enum DataSensitivity {
  PUBLIC = 'public',           // UI preferences, theme
  INTERNAL = 'internal',       // App state, user flows
  SENSITIVE = 'sensitive',     // API keys, user content
  RESTRICTED = 'restricted'    // Personal information
}
```

### Server-Side Storage (Future)

#### 1. Database Schema
```sql
-- Users table (anonymous)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  anonymous_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP,
  last_active TIMESTAMP,
  preferences JSONB
);

-- API keys table (encrypted)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  encrypted_key TEXT,           -- AES-256 encrypted
  key_hash VARCHAR(255),        -- SHA-256 hash for verification
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- User content table (encrypted)
CREATE TABLE user_content (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  content_type VARCHAR(50),     -- 'logic_flow', 'prompt', etc.
  encrypted_data TEXT,          -- AES-256 encrypted
  metadata JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 2. Encryption Strategy
- **At Rest**: AES-256-GCM encryption
- **In Transit**: TLS 1.3 for all communications
- **Key Management**: AWS KMS or similar HSM
- **Key Rotation**: Automated key rotation every 90 days

## Implementation Plan

### Phase 1: Client-Side Security (Current)

#### 1. Secure Storage Service
```typescript
// /src/lib/secure-storage.ts
class SecureStorage {
  private encryptionKey: string;
  private salt: string;

  constructor() {
    this.salt = this.generateSalt();
    this.encryptionKey = this.deriveKey();
  }

  // Encrypt sensitive data before storage
  encrypt(data: any): string {
    // AES-256 encryption implementation
  }

  // Decrypt data after retrieval
  decrypt(encryptedData: string): any {
    // AES-256 decryption implementation
  }

  // Store with encryption
  setItem(key: string, value: any, sensitive: boolean = false): void {
    const data = sensitive ? this.encrypt(value) : value;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Retrieve with decryption
  getItem(key: string, sensitive: boolean = false): any {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return sensitive ? this.decrypt(parsed) : parsed;
  }
}
```

#### 2. API Key Management
```typescript
// /src/lib/api-key-manager.ts
class APIKeyManager {
  private storage: SecureStorage;

  // Store API key securely
  async storeAPIKey(key: string): Promise<void> {
    // Validate key format
    if (!this.validateAPIKey(key)) {
      throw new Error('Invalid API key format');
    }

    // Encrypt and store
    await this.storage.setItem('openai_api_key', key, true);
    
    // Set expiration (optional)
    await this.storage.setItem('api_key_expires', Date.now() + (30 * 24 * 60 * 60 * 1000)); // 30 days
  }

  // Retrieve API key
  async getAPIKey(): Promise<string | null> {
    const key = await this.storage.getItem('openai_api_key', true);
    const expires = await this.storage.getItem('api_key_expires');
    
    if (expires && Date.now() > expires) {
      await this.clearAPIKey();
      return null;
    }
    
    return key;
  }

  // Clear API key
  async clearAPIKey(): Promise<void> {
    await this.storage.removeItem('openai_api_key');
    await this.storage.removeItem('api_key_expires');
  }

  // Validate API key format
  private validateAPIKey(key: string): boolean {
    return /^sk-[a-zA-Z0-9]{48}$/.test(key);
  }
}
```

### Phase 2: Enhanced Security (Future)

#### 1. User Authentication
```typescript
// Optional user authentication system
interface UserAuth {
  isAuthenticated: boolean;
  userId: string;
  sessionToken: string;
  permissions: string[];
}

// OAuth integration (Google, GitHub, etc.)
class AuthService {
  async signInWithGoogle(): Promise<UserAuth> {
    // OAuth 2.0 flow implementation
  }

  async signInWithGitHub(): Promise<UserAuth> {
    // OAuth 2.0 flow implementation
  }

  async signOut(): Promise<void> {
    // Clear all user data
  }
}
```

#### 2. Data Sync & Backup
```typescript
// Secure data synchronization
class DataSync {
  async syncToServer(): Promise<void> {
    // Encrypt data before transmission
    // Use authenticated requests
    // Implement conflict resolution
  }

  async syncFromServer(): Promise<void> {
    // Download encrypted data
    // Decrypt locally
    // Merge with local data
  }

  async backupData(): Promise<void> {
    // Create encrypted backup
    // Store in secure cloud storage
  }
}
```

## Security Controls

### 1. Input Validation
```typescript
// Validate all user inputs
class InputValidator {
  validateAPIKey(key: string): boolean {
    return /^sk-[a-zA-Z0-9]{48}$/.test(key);
  }

  validatePromptText(text: string): boolean {
    return text.length <= 10000 && !this.containsMaliciousContent(text);
  }

  validateLogicStructure(structure: any): boolean {
    // Validate JSON structure
    // Check for required fields
    // Sanitize node labels
  }
}
```

### 2. Content Security Policy
```html
<!-- Strict CSP headers -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';
               connect-src 'self' https://api.openai.com;">
```

### 3. Rate Limiting
```typescript
// Client-side rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  canMakeRequest(key: string, limit: number, window: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests
    const validRequests = requests.filter(time => now - time < window);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}
```

## Privacy Considerations

### 1. Data Collection
- **Minimal Collection**: Only collect necessary data
- **User Consent**: Clear consent for data usage
- **Purpose Limitation**: Use data only for stated purposes
- **Data Minimization**: Collect least amount possible

### 2. Data Retention
```typescript
// Automatic data cleanup
class DataRetention {
  async cleanupExpiredData(): Promise<void> {
    const now = Date.now();
    const retentionPeriod = 90 * 24 * 60 * 60 * 1000; // 90 days
    
    // Clean up old API keys
    // Remove expired cache entries
    // Delete old user content
  }
}
```

### 3. User Rights
- **Data Portability**: Export user data
- **Data Deletion**: Right to be forgotten
- **Data Access**: View stored data
- **Data Correction**: Update incorrect data

## Compliance & Standards

### 1. Security Standards
- **OWASP Top 10**: Address common vulnerabilities
- **ISO 27001**: Information security management
- **SOC 2**: Security, availability, and confidentiality
- **GDPR**: European data protection regulation

### 2. Audit & Monitoring
```typescript
// Security event logging
class SecurityLogger {
  logAPIKeyAccess(): void {
    // Log API key usage
    // Monitor for suspicious activity
  }

  logDataAccess(userId: string, dataType: string): void {
    // Log data access events
    // Track user behavior
  }

  logSecurityEvent(event: SecurityEvent): void {
    // Log security incidents
    // Alert on suspicious activity
  }
}
```

## Implementation Timeline

### Phase 1: Basic Security (Week 1-2)
- [ ] Implement secure storage service
- [ ] Add API key encryption
- [ ] Implement input validation
- [ ] Add CSP headers

### Phase 2: Enhanced Security (Week 3-4)
- [ ] Add rate limiting
- [ ] Implement data retention
- [ ] Add security logging
- [ ] Create privacy controls

### Phase 3: Advanced Security (Month 2)
- [ ] Add user authentication
- [ ] Implement data sync
- [ ] Add audit trails
- [ ] Create compliance reports

## Testing & Validation

### 1. Security Testing
- **Penetration Testing**: Regular security audits
- **Vulnerability Scanning**: Automated security scans
- **Code Review**: Security-focused code reviews
- **Dependency Scanning**: Check for vulnerable dependencies

### 2. Privacy Testing
- **Data Flow Analysis**: Track data movement
- **Consent Testing**: Verify consent mechanisms
- **Retention Testing**: Validate data cleanup
- **Access Testing**: Test user rights implementation

## Incident Response

### 1. Security Incident Plan
1. **Detection**: Automated monitoring and alerts
2. **Assessment**: Evaluate impact and scope
3. **Containment**: Isolate affected systems
4. **Eradication**: Remove threat and vulnerabilities
5. **Recovery**: Restore normal operations
6. **Lessons Learned**: Improve security measures

### 2. Data Breach Response
1. **Notification**: Inform affected users
2. **Investigation**: Determine breach scope
3. **Remediation**: Fix vulnerabilities
4. **Reporting**: Comply with regulations
5. **Prevention**: Implement additional controls
