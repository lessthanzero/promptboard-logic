import React from 'react'
import { usePromptBoardStore } from '../lib/store'

const Header: React.FC = () => {
  const { exportJSON, exportMarkdown, exportPDF } = usePromptBoardStore()

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900">PromptBoard</h1>
        <span className="text-sm text-gray-500">AI Logic Board</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportJSON}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors duration-200"
          >
            JSON
          </button>
          <button
            onClick={exportMarkdown}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors duration-200"
          >
            Markdown
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors duration-200"
          >
            PDF
          </button>
        </div>
        
        {/* Help Button */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header
