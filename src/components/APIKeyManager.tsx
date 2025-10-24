/**
 * API Key Manager Component
 * 
 * Provides a secure interface for managing API keys with encryption,
 * validation, and privacy controls.
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Key, Shield, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { aiService } from '../lib/ai-service';
import { apiKeyManager } from '../lib/api-key-manager';

interface APIKeyInfo {
  provider: string;
  createdAt: number;
  expiresAt?: number;
  lastUsed?: number;
  isActive: boolean;
}

export const APIKeyManager: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'openai' | 'anthropic' | 'custom'>('openai');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [keyInfo, setKeyInfo] = useState<APIKeyInfo | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    loadKeyInfo();
  }, []);

  const loadKeyInfo = async () => {
    try {
      const info = await aiService.getApiKeyInfo(provider);
      const hasApiKey = await aiService.hasApiKey(provider);
      
      setKeyInfo(info);
      setHasKey(hasApiKey);
    } catch (error) {
      console.error('Failed to load key info:', error);
    }
  };

  const handleSetKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await aiService.setApiKey(apiKey, provider);
      setSuccess('API key stored securely');
      setApiKey('');
      await loadKeyInfo();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to store API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearKey = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await aiService.clearApiKey(provider);
      setSuccess('API key cleared');
      await loadKeyInfo();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to clear API key');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getProviderDisplayName = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'OpenAI';
      case 'anthropic':
        return 'Anthropic';
      case 'custom':
        return 'Custom';
      default:
        return provider;
    }
  };

  const getProviderDescription = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'GPT-4, GPT-3.5 Turbo models';
      case 'anthropic':
        return 'Claude-3 Sonnet, Haiku models';
      case 'custom':
        return 'Custom API endpoint';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            API Key Management
          </CardTitle>
          <CardDescription>
            Securely manage your AI provider API keys with encryption and validation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select value={provider} onValueChange={(value: any) => setProvider(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI (GPT-4, GPT-3.5)</SelectItem>
                <SelectItem value="anthropic">Anthropic (Claude-3)</SelectItem>
                <SelectItem value="custom">Custom API</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {getProviderDescription(provider)}
            </p>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${getProviderDisplayName(provider)} API key`}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSetKey}
              disabled={isLoading || !apiKey.trim()}
              className="flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              {isLoading ? 'Storing...' : 'Store Key'}
            </Button>
            {hasKey && (
              <Button
                onClick={handleClearKey}
                disabled={isLoading}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Key
              </Button>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Key Information */}
      {keyInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {getProviderDisplayName(keyInfo.provider)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {keyInfo.isActive ? 'Active' : 'Inactive'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Created:</span>
                <p className="text-muted-foreground">{formatDate(keyInfo.createdAt)}</p>
              </div>
              {keyInfo.expiresAt && (
                <div>
                  <span className="font-medium">Expires:</span>
                  <p className="text-muted-foreground">{formatDate(keyInfo.expiresAt)}</p>
                </div>
              )}
              {keyInfo.lastUsed && (
                <div>
                  <span className="font-medium">Last Used:</span>
                  <p className="text-muted-foreground">{formatDate(keyInfo.lastUsed)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security:</strong> Your API keys are encrypted using AES-256-GCM encryption 
          and stored securely in your browser. Keys are never transmitted to our servers.
        </AlertDescription>
      </Alert>
    </div>
  );
};
