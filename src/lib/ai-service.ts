/**
 * AI Service Implementation
 * 
 * This service handles all AI interactions using the configuration
 * from ai-config.ts. It provides a clean interface for OpenAI integration
 * with proper error handling, caching, and fallback mechanisms.
 */

import { AI_SYSTEM_CONFIG } from './ai-config';

export interface LogicStructure {
  nodes: Array<{
    id: string;
    type: 'condition' | 'action' | 'outcome';
    label: string;
    position: { x: number; y: number };
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label: 'yes' | 'no' | 'default';
  }>;
}

export interface AISuggestion {
  type: 'improvement' | 'missing' | 'clarification';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIResponse {
  success: boolean;
  data?: LogicStructure | string | AISuggestion[];
  error?: string;
  cached?: boolean;
}

class AIService {
  private apiKey: string | null = null;
  private cache = new Map<string, AIResponse>();

  constructor() {
    this.loadApiKey();
  }

  /**
   * Set the OpenAI API key
   */
  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('promptboard_api_key', key);
  }

  /**
   * Load API key from localStorage
   */
  private loadApiKey(): void {
    const stored = localStorage.getItem('promptboard_api_key');
    if (stored) {
      this.apiKey = stored;
    }
  }

  /**
   * Check if API key is available
   */
  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  /**
   * Generate logic structure from natural language
   */
  async getLogicFromPrompt(promptText: string): Promise<AIResponse> {
    if (!this.apiKey) {
      return this.getMockLogicFromPrompt(promptText);
    }

    const cacheKey = this.generateCacheKey('logic', promptText);
    const cached = this.getCachedResponse(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    try {
      const response = await this.callOpenAI(
        AI_SYSTEM_CONFIG.prompts.logicAnalysis,
        promptText
      );

      const logicStructure = this.parseLogicResponse(response);
      const result: AIResponse = {
        success: true,
        data: logicStructure
      };

      this.setCachedResponse(cacheKey, result);
      return result;
    } catch (error) {
      console.error('AI Logic generation failed:', error);
      return this.getMockLogicFromPrompt(promptText);
    }
  }

  /**
   * Convert logic structure back to natural language
   */
  async summarizeGraph(logicStructure: LogicStructure): Promise<AIResponse> {
    if (!this.apiKey) {
      return this.getMockSummarization(logicStructure);
    }

    const cacheKey = this.generateCacheKey('summary', JSON.stringify(logicStructure));
    const cached = this.getCachedResponse(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    try {
      const response = await this.callOpenAI(
        AI_SYSTEM_CONFIG.prompts.textSummarization,
        JSON.stringify(logicStructure)
      );

      const result: AIResponse = {
        success: true,
        data: response
      };

      this.setCachedResponse(cacheKey, result);
      return result;
    } catch (error) {
      console.error('AI Summarization failed:', error);
      return this.getMockSummarization(logicStructure);
    }
  }

  /**
   * Get suggestions for improving logic
   */
  async getSuggestions(logicStructure: LogicStructure): Promise<AIResponse> {
    if (!this.apiKey) {
      return this.getMockSuggestions(logicStructure);
    }

    const cacheKey = this.generateCacheKey('suggestions', JSON.stringify(logicStructure));
    const cached = this.getCachedResponse(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    try {
      const response = await this.callOpenAI(
        AI_SYSTEM_CONFIG.prompts.suggestions,
        JSON.stringify(logicStructure)
      );

      const suggestions = this.parseSuggestionsResponse(response);
      const result: AIResponse = {
        success: true,
        data: suggestions
      };

      this.setCachedResponse(cacheKey, result);
      return result;
    } catch (error) {
      console.error('AI Suggestions failed:', error);
      return this.getMockSuggestions(logicStructure);
    }
  }

  /**
   * Call OpenAI API with proper error handling
   */
  private async callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('No API key available');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_SYSTEM_CONFIG.config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: AI_SYSTEM_CONFIG.config.temperature,
        max_tokens: AI_SYSTEM_CONFIG.config.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * Parse logic response from AI
   */
  private parseLogicResponse(response: string): LogicStructure {
    try {
      const parsed = JSON.parse(response);
      
      // Validate structure
      if (!parsed.nodes || !parsed.edges) {
        throw new Error('Invalid response structure');
      }

      return parsed as LogicStructure;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid JSON response from AI');
    }
  }

  /**
   * Parse suggestions response from AI
   */
  private parseSuggestionsResponse(response: string): AISuggestion[] {
    try {
      const parsed = JSON.parse(response);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse suggestions response:', error);
      return [];
    }
  }

  /**
   * Generate cache key for requests
   */
  private generateCacheKey(type: string, input: string): string {
    const hash = this.simpleHash(input);
    return `${AI_SYSTEM_CONFIG.caching.storage.keyPrefix}${type}_${hash}`;
  }

  /**
   * Simple hash function for caching
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get cached response
   */
  private getCachedResponse(key: string): AIResponse | null {
    if (!AI_SYSTEM_CONFIG.caching.promptHash.enabled) {
      return null;
    }

    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    // Check localStorage
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.cache.set(key, parsed);
        return parsed;
      } catch (error) {
        console.error('Failed to parse cached response:', error);
      }
    }

    return null;
  }

  /**
   * Set cached response
   */
  private setCachedResponse(key: string, response: AIResponse): void {
    if (!AI_SYSTEM_CONFIG.caching.promptHash.enabled) {
      return;
    }

    this.cache.set(key, response);
    localStorage.setItem(key, JSON.stringify(response));
  }

  /**
   * Mock implementations for when API is not available
   */
  private getMockLogicFromPrompt(promptText: string): AIResponse {
    // Use existing mock data logic
    const mockData = require('../../mocks/ai-responses.json');
    const scenarios = mockData.samplePrompts;
    
    // Simple logic to select appropriate scenario
    let selectedScenario = scenarios[0]; // Default to first scenario
    
    if (promptText.toLowerCase().includes('onboarding')) {
      selectedScenario = scenarios[0];
    } else if (promptText.toLowerCase().includes('price') || promptText.toLowerCase().includes('pricing')) {
      selectedScenario = scenarios[1];
    } else if (promptText.toLowerCase().includes('test') || promptText.toLowerCase().includes('ab')) {
      selectedScenario = scenarios[2];
    }

    return {
      success: true,
      data: {
        nodes: selectedScenario.nodes,
        edges: selectedScenario.edges
      }
    };
  }

  private getMockSummarization(logicStructure: LogicStructure): AIResponse {
    // Simple mock summarization
    const summary = logicStructure.nodes
      .map(node => `${node.type}: ${node.label}`)
      .join(' → ');
    
    return {
      success: true,
      data: summary
    };
  }

  private getMockSuggestions(logicStructure: LogicStructure): AIResponse {
    // Simple mock suggestions
    const suggestions: AISuggestion[] = [
      {
        type: 'improvement',
        title: 'Add error handling',
        description: 'Consider adding error handling for edge cases',
        priority: 'medium'
      }
    ];

    return {
      success: true,
      data: suggestions
    };
  }
}

// Export singleton instance
export const aiService = new AIService();
