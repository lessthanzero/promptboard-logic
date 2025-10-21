import React, { useState } from 'react'
import { usePromptBoardStore } from '../lib/store'
import AssistantPanel from './AssistantPanel'

const Sidebar: React.FC = () => {
  const { nodes, edges } = usePromptBoardStore()
  const [activeTab, setActiveTab] = useState<'json' | 'assistant'>('json')

  const jsonData = {
    nodes,
    edges,
    timestamp: new Date().toISOString()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('json')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'json'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          JSON View
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'assistant'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          AI Assistant
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 min-h-0">
        {activeTab === 'json' ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Logic Structure</h3>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 min-h-[44px] px-2"
                title="Copy JSON"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs font-mono overflow-auto flex-1 text-gray-900 dark:text-gray-100">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        ) : (
          <AssistantPanel />
        )}
      </div>
    </div>
  )
}

export default Sidebar
