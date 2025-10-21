import { LogicNode, LogicEdge } from './store'

export interface Suggestion {
  id: string
  text: string
  action: 'merge' | 'create' | 'acknowledge' | 'simplify' | 'add-outcome'
  icon: string
  confidence: number
  applicable: boolean
}

export interface NodeContext {
  nodeId: string
  nodeType: 'condition' | 'action' | 'outcome'
  nodeLabel: string
  connectedNodes: string[]
  graphSize: number
}

export interface AIResponse {
  nodes: LogicNode[]
  edges: LogicEdge[]
  suggestions?: Suggestion[]
}

// Mock AI Service
export class MockAIService {
  private static instance: MockAIService
  private suggestionHistory: Map<string, Suggestion[]> = new Map()

  static getInstance(): MockAIService {
    if (!MockAIService.instance) {
      MockAIService.instance = new MockAIService()
    }
    return MockAIService.instance
  }

  // Get contextual suggestions based on node context
  async getSuggestions(context: NodeContext): Promise<Suggestion[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const suggestions: Suggestion[] = []

    // Context-based suggestions
    if (context.nodeType === 'condition') {
      suggestions.push({
        id: 'simplify-condition',
        text: 'Simplify this condition?',
        action: 'simplify',
        icon: '🔧',
        confidence: 0.8,
        applicable: true
      })
    }

    if (context.nodeType === 'action') {
      suggestions.push({
        id: 'add-outcome',
        text: 'Add missing outcome?',
        action: 'add-outcome',
        icon: '➕',
        confidence: 0.9,
        applicable: true
      })
    }

    if (context.nodeType === 'outcome') {
      suggestions.push({
        id: 'acknowledge-outcome',
        text: 'Outcome looks good!',
        action: 'acknowledge',
        icon: '✅',
        confidence: 0.7,
        applicable: true
      })
    }

    // Graph size-based suggestions
    if (context.graphSize > 5) {
      suggestions.push({
        id: 'merge-similar',
        text: 'Merge similar branches?',
        action: 'merge',
        icon: '🔀',
        confidence: 0.6,
        applicable: true
      })
    }

    // Store suggestions for this context
    this.suggestionHistory.set(context.nodeId, suggestions)

    return suggestions
  }

  // Parse natural language prompt into logic graph
  async parsePrompt(prompt: string): Promise<AIResponse> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simple keyword-based parsing for demo
    const lowerPrompt = prompt.toLowerCase()
    
    if (lowerPrompt.includes('onboarding') && lowerPrompt.includes('tooltip')) {
      return {
        nodes: [
          {
            id: 'c1',
            type: 'condition',
            label: 'User skips onboarding?',
            position: { x: 100, y: 100 },
            data: { label: 'User skips onboarding?' }
          },
          {
            id: 'a1',
            type: 'action',
            label: 'Show tooltip reminder',
            position: { x: 50, y: 200 },
            data: { label: 'Show tooltip reminder' }
          },
          {
            id: 'a2',
            type: 'action',
            label: 'Proceed to dashboard',
            position: { x: 150, y: 200 },
            data: { label: 'Proceed to dashboard' }
          },
          {
            id: 'o1',
            type: 'outcome',
            label: 'Reduced confusion',
            position: { x: 50, y: 300 },
            data: { label: 'Reduced confusion' }
          },
          {
            id: 'o2',
            type: 'outcome',
            label: 'Normal flow',
            position: { x: 150, y: 300 },
            data: { label: 'Normal flow' }
          }
        ],
        edges: [
          { id: 'e1', source: 'c1', target: 'a1', label: 'yes' },
          { id: 'e2', source: 'c1', target: 'a2', label: 'no' },
          { id: 'e3', source: 'a1', target: 'o1' },
          { id: 'e4', source: 'a2', target: 'o2' }
        ]
      }
    }

    // Fallback for other prompts
    return {
      nodes: [
        {
          id: 'c1',
          type: 'condition',
          label: 'Condition?',
          position: { x: 100, y: 100 },
          data: { label: 'Condition?' }
        },
        {
          id: 'a1',
          type: 'action',
          label: 'Action',
          position: { x: 100, y: 200 },
          data: { label: 'Action' }
        },
        {
          id: 'o1',
          type: 'outcome',
          label: 'Outcome',
          position: { x: 100, y: 300 },
          data: { label: 'Outcome' }
        }
      ],
      edges: [
        { id: 'e1', source: 'c1', target: 'a1' },
        { id: 'e2', source: 'a1', target: 'o1' }
      ]
    }
  }

  // Summarize graph into plain text
  async summarizeGraph(nodes: LogicNode[], edges: LogicEdge[]): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Find root nodes (no incoming edges)
    const rootNodes = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    )

    // Find leaf nodes (no outgoing edges) - for future use
    // const leafNodes = nodes.filter(node => 
    //   !edges.some(edge => edge.source === node.id)
    // )

    // Generate summary
    let summary = 'Logic Summary:\n\n'
    
    rootNodes.forEach(root => {
      summary += `If ${root.label.toLowerCase()}, then:\n`
      
      // Find connected nodes
      const connectedEdges = edges.filter(edge => edge.source === root.id)
      connectedEdges.forEach(edge => {
        const targetNode = nodes.find(n => n.id === edge.target)
        if (targetNode) {
          summary += `  - ${targetNode.label}\n`
        }
      })
      summary += '\n'
    })

    return summary
  }

  // Get suggestion history for a node
  getSuggestionHistory(nodeId: string): Suggestion[] {
    return this.suggestionHistory.get(nodeId) || []
  }

  // Clear suggestion history
  clearSuggestionHistory(): void {
    this.suggestionHistory.clear()
  }
}

// Export singleton instance
export const aiService = MockAIService.getInstance()

// Real AI integration (stubbed for future)
export class RealAIService {
  async getSuggestions(_context: NodeContext): Promise<Suggestion[]> {
    // TODO: Implement real AI API calls
    throw new Error('Real AI service not implemented yet')
  }

  async parsePrompt(_prompt: string): Promise<AIResponse> {
    // TODO: Implement real AI API calls
    throw new Error('Real AI service not implemented yet')
  }

  async summarizeGraph(_nodes: LogicNode[], _edges: LogicEdge[]): Promise<string> {
    // TODO: Implement real AI API calls
    throw new Error('Real AI service not implemented yet')
  }
}

// Factory function to get the appropriate service
export const getAIService = (): MockAIService | RealAIService => {
  const useRealAI = (import.meta as any).env?.VITE_USE_REAL_AI === 'true'
  return useRealAI ? new RealAIService() : aiService
}
