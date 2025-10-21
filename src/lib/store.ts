import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LogicNode {
  id: string
  type: 'condition' | 'action' | 'outcome'
  label: string
  position: { x: number; y: number }
  data: {
    label: string
  }
}

export interface LogicEdge {
  id: string
  source: string
  target: string
  label?: string
  type?: string
}

interface PromptBoardState {
  nodes: LogicNode[]
  edges: LogicEdge[]
  promptText: string
  
  // Actions
  addNode: (node: LogicNode) => void
  updateNode: (id: string, updates: Partial<LogicNode>) => void
  deleteNode: (id: string) => void
  addEdge: (edge: LogicEdge) => void
  deleteEdge: (id: string) => void
  setPromptText: (text: string) => void
  clearAll: () => void
  loadMockData: () => void
}

const STORAGE_VERSION = "v2"
const STORAGE_KEY = `promptboard_state_${STORAGE_VERSION}`

export const usePromptBoardStore = create<PromptBoardState>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      promptText: '',
      
      addNode: (node) => set((state) => ({
        nodes: [...state.nodes, node]
      })),
      
      updateNode: (id, updates) => set((state) => ({
        nodes: state.nodes.map(node => 
          node.id === id ? { 
            ...node, 
            ...updates,
            data: { ...node.data, ...(updates.label ? { label: updates.label } : {}) }
          } : node
        )
      })),
      
      deleteNode: (id) => set((state) => ({
        nodes: state.nodes.filter(node => node.id !== id),
        edges: state.edges.filter(edge => edge.source !== id && edge.target !== id)
      })),
      
      addEdge: (edge) => set((state) => ({
        edges: [...state.edges, edge]
      })),
      
      deleteEdge: (id) => set((state) => ({
        edges: state.edges.filter(edge => edge.id !== id)
      })),
      
      setPromptText: (text) => set({ promptText: text }),
      
      clearAll: () => set({ nodes: [], edges: [], promptText: '' }),
      
      loadMockData: () => set({
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
        ],
        promptText: 'If user skips onboarding, show tooltip reminder, else proceed to dashboard.'
      })
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      migrate: (persistedState: any, version: number) => {
        // Migration logic for future versions
        if (version === 1) {
          // Migrate v1 to v2 if needed
          return {
            ...persistedState,
            // Add any new fields or transformations
          }
        }
        return persistedState
      }
    }
  )
)
