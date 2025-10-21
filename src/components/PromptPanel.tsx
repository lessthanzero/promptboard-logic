import React from 'react'
import { usePromptBoardStore } from '../lib/store'
import { useToastContext } from '../contexts/ToastContext'

const PromptPanel: React.FC = () => {
  const { promptText, setPromptText, clearAll, loadMockData, generateLogic, isAnalyzing, syncToText } = usePromptBoardStore()
  const { showSuccess, showError } = useToastContext()

  const handleGenerate = async () => {
    if (promptText.trim()) {
      try {
        await generateLogic(promptText.trim())
        showSuccess('Logic Generated!', 'Your logic graph has been created successfully.')
      } catch (error) {
        showError('Generation Failed', 'Failed to generate logic. Please try again.')
      }
    }
  }

  const handleSample = () => {
    loadMockData()
    showSuccess('Sample Loaded!', 'Mock data has been loaded successfully.')
  }

  const handleClear = () => {
    clearAll()
    showSuccess('Canvas Cleared!', 'All nodes and edges have been removed.')
  }

  const handleSync = async () => {
    try {
      await syncToText()
      showSuccess('Synced to Text!', 'Graph has been converted to text format.')
    } catch (error) {
      showError('Sync Failed', 'Failed to sync graph to text.')
    }
  }

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Described Logic</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[44px]">
            <option value="pm">PM</option>
            <option value="researcher">Researcher</option>
            <option value="custom">Custom...</option>
          </select>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="flex-1 min-h-0">
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="If user skips onboarding, then show tooltip reminder, else proceed to dashboard..."
          className="w-full h-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Hints Card - Moved below text area */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <h3 className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-2">Hints</h3>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Keep it short (2–3 sentences)</li>
          <li>• Use "if… then…" statements</li>
          <li>• Be specific about conditions and outcomes</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="btn-group-vertical">
        <button
          onClick={handleGenerate}
          disabled={isAnalyzing || !promptText.trim()}
          className={`w-full btn-primary ${isAnalyzing ? 'btn-loading' : ''}`}
        >
          {isAnalyzing ? 'Generating...' : 'Generate Logic'}
        </button>
        
        <div className="btn-group">
          <button
            onClick={handleSample}
            className="flex-1 btn-secondary"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="flex-1 btn-danger"
          >
            Clear
          </button>
        </div>
        
        <button
          onClick={handleSync}
          className="w-full btn-success"
        >
          Sync to Text
        </button>
      </div>
    </div>
  )
}

export default PromptPanel
