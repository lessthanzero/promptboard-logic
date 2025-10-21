import React from 'react'
import { usePromptBoardStore } from '../lib/store'

const EmptyState: React.FC = () => {
  const { loadMockData } = usePromptBoardStore()
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">💡</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No logic yet
        </h3>
        <p className="text-gray-600 mb-4">
          Paste text on the left to generate your logic diagram
        </p>
        <button 
          onClick={loadMockData}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Try Sample
        </button>
      </div>
    </div>
  )
}

export default EmptyState
