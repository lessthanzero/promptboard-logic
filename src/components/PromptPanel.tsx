import React from 'react'
import { usePromptBoardStore } from '../lib/store'

const PromptPanel: React.FC = () => {
  const { promptText, setPromptText, clearAll, loadMockData, generateLogic, isAnalyzing, syncToText } = usePromptBoardStore()

  const handleGenerate = async () => {
    if (promptText.trim()) {
      await generateLogic(promptText.trim())
    }
  }

  const handleSample = () => {
    loadMockData()
  }

  const handleClear = () => {
    clearAll()
  }

  const handleSync = async () => {
    await syncToText()
  }

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Describe your logic</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option value="pm">PM</option>
            <option value="researcher">Researcher</option>
            <option value="custom">Custom...</option>
          </select>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="flex-1">
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="If user skips onboarding, then show tooltip reminder, else proceed to dashboard..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleGenerate}
          disabled={isAnalyzing || !promptText.trim()}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isAnalyzing ? 'Generating...' : 'Generate Logic'}
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={handleSample}
            className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-red-100 text-red-900 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
        
        <button
          onClick={handleSync}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Sync to Text
        </button>
      </div>

      {/* Hints Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Hints</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep it short (2–3 sentences)</li>
          <li>• Use "if… then…" statements</li>
          <li>• Be specific about conditions and outcomes</li>
        </ul>
      </div>
    </div>
  )
}

export default PromptPanel
