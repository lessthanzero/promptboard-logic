/**
 * Privacy Manager Component
 * 
 * Provides privacy controls for data collection, retention, and user rights
 * in compliance with GDPR and other privacy regulations.
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Download, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Database
} from 'lucide-react';
import { privacyManager } from '../lib/privacy-manager';

interface PrivacySettings {
  analytics: boolean;
  performance: boolean;
  errorTracking: boolean;
  dataRetention: number; // days
  anonymizeData: boolean;
}

export const PrivacyManager: React.FC = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    analytics: false,
    performance: false,
    errorTracking: false,
    dataRetention: 30,
    anonymizeData: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const consent = await privacyManager.getConsentSettings();
      setSettings({
        analytics: consent.analytics,
        performance: consent.performance,
        errorTracking: consent.errorTracking,
        dataRetention: consent.dataRetentionDays,
        anonymizeData: consent.anonymizeData
      });
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
    }
  };

  const handleSettingChange = async (key: keyof PrivacySettings, value: boolean | number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      await privacyManager.updateConsentSettings({
        analytics: newSettings.analytics,
        performance: newSettings.performance,
        errorTracking: newSettings.errorTracking,
        dataRetentionDays: newSettings.dataRetention,
        anonymizeData: newSettings.anonymizeData
      });

      setMessage({ type: 'success', text: 'Privacy settings updated' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update settings' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      const data = await privacyManager.exportUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `promptboard-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setMessage({ type: 'success', text: 'Data exported successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteData = async () => {
    if (!confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      await privacyManager.deleteUserData();
      setMessage({ type: 'success', text: 'All data deleted successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete data' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Control how your data is collected, stored, and used.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Collection Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Data Collection</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="analytics">Usage Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve the app by sharing anonymous usage data
                </p>
              </div>
              <Switch
                id="analytics"
                checked={settings.analytics}
                onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="performance">Performance Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  Monitor app performance and identify issues
                </p>
              </div>
              <Switch
                id="performance"
                checked={settings.performance}
                onCheckedChange={(checked) => handleSettingChange('performance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="errorTracking">Error Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically report errors to help fix bugs
                </p>
              </div>
              <Switch
                id="errorTracking"
                checked={settings.errorTracking}
                onCheckedChange={(checked) => handleSettingChange('errorTracking', checked)}
              />
            </div>
          </div>

          {/* Data Protection Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Data Protection</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="anonymizeData">Anonymize Data</Label>
                <p className="text-sm text-muted-foreground">
                  Remove personally identifiable information from collected data
                </p>
              </div>
              <Switch
                id="anonymizeData"
                checked={settings.anonymizeData}
                onCheckedChange={(checked) => handleSettingChange('anonymizeData', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <select
                id="dataRetention"
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
              <p className="text-sm text-muted-foreground">
                How long to keep your data before automatic deletion
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              {message.type === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Data Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Your Data Rights
          </CardTitle>
          <CardDescription>
            Exercise your rights under GDPR and other privacy laws.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleExportData}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export My Data
            </Button>
            
            <Button
              onClick={handleDeleteData}
              disabled={isLoading}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Data
            </Button>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Export:</strong> Download all your data in JSON format</p>
            <p><strong>Delete:</strong> Permanently remove all your data from the app</p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Privacy First:</strong> We believe in protecting your privacy. 
          All data is processed locally in your browser and never sent to our servers 
          unless you explicitly choose to use AI features with your own API keys.
        </AlertDescription>
      </Alert>
    </div>
  );
};
