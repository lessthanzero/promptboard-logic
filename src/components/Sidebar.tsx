import React, { useState } from 'react'
import { usePromptBoardStore } from '../lib/store'

const Sidebar: React.FC = () => {
  const { nodes, edges } = usePromptBoardStore()
  const [activeTab, setActiveTab] = useState<'json' | 'assistant'>('json')

  const jsonData = {
    nodes,
    edges,
    timestamp: new Date().toISOString()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('json')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'json'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          JSON View
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'assistant'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          AI Assistant
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === 'json' ? (
          <div className="h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Logic Structure</h3>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Copy
              </button>
            </div>
            <pre className="bg-gray-100 p-3 rounded-lg text-xs font-mono overflow-auto h-full">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="h-full">
            <h3 className="text-sm font-medium text-gray-900 mb-3">AI Assistant</h3>
            <div className="text-sm text-gray-500">
              <p>No suggestions yet.</p>
              <p className="mt-2">Edit nodes to see AI suggestions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
