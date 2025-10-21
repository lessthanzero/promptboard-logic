import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LogicNode {
  id: string
  type: 'condition' | 'action' | 'outcome'
  label: string
  position?: { x: number; y: number }
}

export interface LogicEdge {
  id: string
  source: string
  target: string
  label?: string
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
          node.id === id ? { ...node, ...updates } : node
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
      
      clearAll: () => set({ nodes: [], edges: [], promptText: '' })
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
