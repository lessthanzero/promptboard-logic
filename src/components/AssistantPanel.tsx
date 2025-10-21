import React from 'react'
import { usePromptBoardStore } from '../lib/store'

const AssistantPanel: React.FC = () => {
  const { suggestions, applySuggestion, dismissSuggestion } = usePromptBoardStore()

  if (suggestions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🤖</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
        <p className="text-sm text-gray-600 text-center">
          No suggestions yet.
        </p>
        <p className="text-xs text-gray-500 text-center mt-2">
          Edit nodes to see AI suggestions.
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">AI Suggestions</h3>
        <span className="text-xs text-gray-500">{suggestions.length} suggestions</span>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{suggestion.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {suggestion.text}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-500">
                    Confidence: {Math.round(suggestion.confidence * 100)}%
                  </span>
                  <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${suggestion.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => applySuggestion(suggestion.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => dismissSuggestion(suggestion.id)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors duration-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssistantPanel
