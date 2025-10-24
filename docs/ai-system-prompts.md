# AI System Prompts & Diagram Architecture

## Overview
This document defines the system prompts, architectural rules, and limitations for the PromptBoard AI Logic Board. These prompts guide how the AI transforms natural language into structured logic diagrams.

## System Prompts

### 1. Logic Analysis System Prompt
```
You are an expert logic flow analyzer. Your task is to convert natural language descriptions into structured logic diagrams.

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
7. Ensure logical flow is complete and executable
```

### 2. Text Summarization System Prompt
```
You are a logic flow summarizer. Convert structured logic diagrams back into natural language.

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
7. Keep it concise but complete
```

### 3. Suggestion System Prompt
```
You are an AI assistant that suggests improvements to logic flows.

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
5. Consider edge cases
```

## Diagram Architecture Rules

### Node Types & Constraints

#### Condition Nodes
- **Purpose**: Decision points with yes/no branches
- **Required**: Must have exactly 2 outgoing edges (yes/no)
- **Labels**: Should be questions or statements ending with "?"
- **Position**: Typically at the start or middle of flows
- **Color**: Blue (#3b82f6)
- **Icon**: Question mark (HelpCircle)

#### Action Nodes
- **Purpose**: Executable steps or processes
- **Required**: Must have exactly 1 outgoing edge
- **Labels**: Should be imperative verbs or clear actions
- **Position**: Between conditions and outcomes
- **Color**: Orange (#f59e0b)
- **Icon**: Lightning bolt (Zap)

#### Outcome Nodes
- **Purpose**: Final results or end states
- **Required**: Must have 0 outgoing edges (terminal)
- **Labels**: Should describe final states or results
- **Position**: At the end of flows
- **Color**: Green (#10b981)
- **Icon**: Target (Target)

### Edge Types & Constraints

#### Yes/No Edges
- **Purpose**: Connect conditions to next steps
- **Labels**: "yes" or "no" (lowercase)
- **Styling**: Solid lines for "yes", dashed for "no"
- **Colors**: Blue for "yes", gray for "no"

#### Default Edges
- **Purpose**: Connect actions to outcomes
- **Labels**: "default" or empty
- **Styling**: Solid lines
- **Colors**: Blue

### Layout Rules

#### Positioning Constraints
- **X-axis**: 0-800 pixels (scaled by 3x in display)
- **Y-axis**: 0-600 pixels (scaled by 2x in display)
- **Spacing**: Minimum 100px between nodes
- **Alignment**: Prefer horizontal flow (left to right)

#### Scaling Rules
- **Display Scale**: 3x horizontal, 2x vertical
- **Card Size**: 224px width, 80px height
- **Connection Points**: Center of cards (112px, 40px)

### Validation Rules

#### Logical Completeness
1. Every condition must have yes/no branches
2. Every action must lead somewhere
3. Every outcome must be reachable
4. No orphaned nodes (except start conditions)
5. No infinite loops

#### Naming Conventions
1. **Conditions**: End with "?" or use "If..." format
2. **Actions**: Use imperative verbs ("Show", "Send", "Create")
3. **Outcomes**: Use past tense or result descriptions
4. **IDs**: Use kebab-case (e.g., "user-skip-onboarding")

## API Integration Rules

### OpenAI API Configuration
```typescript
interface AIConfig {
  model: "gpt-4" | "gpt-3.5-turbo";
  temperature: 0.1; // Low for consistent structure
  max_tokens: 2000;
  system_prompt: string;
  user_prompt: string;
}
```

### Error Handling
1. **Invalid JSON**: Retry with simplified prompt
2. **Missing Fields**: Use default values
3. **API Errors**: Fall back to mock data
4. **Rate Limits**: Queue requests with exponential backoff

### Caching Strategy
1. **Prompt Hash**: Cache based on input text hash
2. **TTL**: 24 hours for similar prompts
3. **Invalidation**: Clear cache on manual refresh
4. **Storage**: localStorage for client-side caching

## Usage Examples

### Example Input
```
"If user skips onboarding, show tooltip reminder, else proceed to dashboard"
```

### Expected Output
```json
{
  "nodes": [
    {
      "id": "onboarding-check",
      "type": "condition",
      "label": "User skips onboarding?",
      "position": {"x": 0, "y": 0}
    },
    {
      "id": "show-tooltip",
      "type": "action",
      "label": "Show tooltip reminder",
      "position": {"x": 300, "y": 0}
    },
    {
      "id": "proceed-dashboard",
      "type": "action",
      "label": "Proceed to dashboard",
      "position": {"x": 300, "y": 100}
    }
  ],
  "edges": [
    {
      "id": "skip-yes",
      "source": "onboarding-check",
      "target": "show-tooltip",
      "label": "yes"
    },
    {
      "id": "skip-no",
      "source": "onboarding-check",
      "target": "proceed-dashboard",
      "label": "no"
    }
  ]
}
```

## Maintenance & Updates

### Version Control
- **System Prompts**: Version in this document
- **Architecture Rules**: Update when adding new node types
- **API Config**: Track in package.json or separate config file

### Testing
- **Unit Tests**: Test prompt parsing with known inputs
- **Integration Tests**: Test full AI pipeline
- **Edge Cases**: Test with complex, ambiguous inputs

### Monitoring
- **Success Rate**: Track successful JSON generation
- **Error Types**: Categorize common failure modes
- **Performance**: Monitor API response times
- **User Feedback**: Track suggestion acceptance rates
