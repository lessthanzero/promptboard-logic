/**
 * AI Configuration and System Prompts
 * 
 * This file contains all system prompts, architectural rules, and configuration
 * for the AI integration. It serves as the single source of truth for how
 * the AI should behave when processing user input.
 */

export interface AIConfig {
  model: 'gpt-4' | 'gpt-3.5-turbo';
  temperature: number;
  maxTokens: number;
  timeout: number;
}

export interface SystemPrompts {
  logicAnalysis: string;
  textSummarization: string;
  suggestions: string;
}

export interface DiagramRules {
  nodeTypes: string[];
  edgeTypes: string[];
  positioning: {
    xRange: [number, number];
    yRange: [number, number];
    minSpacing: number;
  };
  scaling: {
    horizontal: number;
    vertical: number;
  };
}

// System Prompts
export const SYSTEM_PROMPTS: SystemPrompts = {
  logicAnalysis: `You are an expert logic flow analyzer. Your task is to convert natural language descriptions into structured logic diagrams.

**Your Role:**
- Analyze user input for logical conditions, actions, and outcomes
- Identify decision points and branching logic
- Create clear, executable logic flows
- Suggest improvements for logical clarity

**Output Format:**
Always return valid JSON with this exact structure:
{
  "nodes": [
    {
      "id": "unique-id",
      "type": "condition|action|outcome",
      "label": "Clear, concise description",
      "position": {"x": number, "y": number}
    }
  ],
  "edges": [
    {
      "id": "unique-id",
      "source": "source-node-id",
      "target": "target-node-id",
      "label": "yes|no|default"
    }
  ]
}

**Rules:**
1. Use only three node types: condition, action, outcome
2. Conditions must have yes/no branches
3. Actions lead to outcomes or next conditions
4. Outcomes are terminal (no outgoing edges)
5. Position nodes to avoid overlaps (x: 0-800, y: 0-600)
6. Keep labels concise but descriptive
7. Ensure logical flow is complete and executable`,

  textSummarization: `You are a logic flow summarizer. Convert structured logic diagrams back into natural language.

**Your Role:**
- Transform JSON logic structure into readable text
- Maintain logical flow and decision points
- Use clear, professional language
- Include all conditions, actions, and outcomes

**Output Format:**
Return a single paragraph or bulleted list that describes the complete logic flow.

**Rules:**
1. Start with the initial condition
2. Follow the logical sequence
3. Include all decision branches
4. End with final outcomes
5. Use "If...then..." structure for conditions
6. Use "→" arrows for actions
7. Keep it concise but complete`,

  suggestions: `You are an AI assistant that suggests improvements to logic flows.

**Your Role:**
- Analyze existing logic for potential issues
- Suggest clearer conditions or actions
- Identify missing decision points
- Recommend better flow structure

**Output Format:**
Return an array of suggestion objects:
[
  {
    "type": "improvement|missing|clarification",
    "title": "Brief suggestion title",
    "description": "Detailed explanation",
    "priority": "high|medium|low"
  }
]

**Rules:**
1. Focus on logical completeness
2. Suggest actionable improvements
3. Prioritize high-impact changes
4. Be specific and helpful
5. Consider edge cases`
};

// Diagram Architecture Rules
export const DIAGRAM_RULES: DiagramRules = {
  nodeTypes: ['condition', 'action', 'outcome'],
  edgeTypes: ['yes', 'no', 'default'],
  positioning: {
    xRange: [0, 800],
    yRange: [0, 600],
    minSpacing: 100
  },
  scaling: {
    horizontal: 3,
    vertical: 2
  }
};

// AI Configuration
export const AI_CONFIG: AIConfig = {
  model: 'gpt-4',
  temperature: 0.1, // Low for consistent structure
  maxTokens: 2000,
  timeout: 30000 // 30 seconds
};

// Node Type Definitions
export const NODE_TYPE_CONFIG = {
  condition: {
    color: '#3b82f6',
    icon: 'HelpCircle',
    requiredEdges: 2, // Must have yes/no branches
    maxEdges: 2
  },
  action: {
    color: '#f59e0b',
    icon: 'Zap',
    requiredEdges: 1, // Must lead somewhere
    maxEdges: 1
  },
  outcome: {
    color: '#10b981',
    icon: 'Target',
    requiredEdges: 0, // Terminal nodes
    maxEdges: 0
  }
};

// Edge Type Definitions
export const EDGE_TYPE_CONFIG = {
  yes: {
    style: 'solid',
    color: '#3b82f6',
    label: 'yes'
  },
  no: {
    style: 'dashed',
    color: '#6b7280',
    label: 'no'
  },
  default: {
    style: 'solid',
    color: '#3b82f6',
    label: 'default'
  }
};

// Validation Rules
export const VALIDATION_RULES = {
  logicalCompleteness: {
    everyConditionHasBranches: true,
    everyActionLeadsSomewhere: true,
    everyOutcomeIsReachable: true,
    noOrphanedNodes: true,
    noInfiniteLoops: true
  },
  namingConventions: {
    conditions: 'End with "?" or use "If..." format',
    actions: 'Use imperative verbs ("Show", "Send", "Create")',
    outcomes: 'Use past tense or result descriptions',
    ids: 'Use kebab-case (e.g., "user-skip-onboarding")'
  }
};

// Error Handling Configuration
export const ERROR_HANDLING = {
  invalidJson: {
    retryWithSimplifiedPrompt: true,
    maxRetries: 3,
    fallbackToMock: true
  },
  missingFields: {
    useDefaultValues: true,
    logMissingFields: true
  },
  apiErrors: {
    fallbackToMock: true,
    showUserMessage: true,
    logError: true
  },
  rateLimits: {
    queueRequests: true,
    exponentialBackoff: true,
    maxQueueSize: 10
  }
};

// Caching Configuration
export const CACHING_CONFIG = {
  promptHash: {
    enabled: true,
    algorithm: 'sha256'
  },
  ttl: {
    hours: 24,
    similarPrompts: true
  },
  invalidation: {
    manualRefresh: true,
    onError: false
  },
  storage: {
    type: 'localStorage',
    keyPrefix: 'promptboard_ai_cache_'
  }
};

// Export all configurations
export const AI_SYSTEM_CONFIG = {
  prompts: SYSTEM_PROMPTS,
  rules: DIAGRAM_RULES,
  config: AI_CONFIG,
  nodeTypes: NODE_TYPE_CONFIG,
  edgeTypes: EDGE_TYPE_CONFIG,
  validation: VALIDATION_RULES,
  errorHandling: ERROR_HANDLING,
  caching: CACHING_CONFIG
};
