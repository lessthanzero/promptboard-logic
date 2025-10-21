import React from 'react'
import { usePromptBoardStore } from '../lib/store'
import { useTheme } from '../contexts/ThemeContext'

const Header: React.FC = () => {
  const { exportJSON, exportMarkdown, exportPDF } = usePromptBoardStore()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">PromptBoard</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">AI Logic Board</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportJSON}
            className="btn-primary text-sm px-3 py-1"
          >
            JSON
          </button>
          <button
            onClick={exportMarkdown}
            className="btn-success text-sm px-3 py-1"
          >
            Markdown
          </button>
          <button
            onClick={exportPDF}
            className="btn-danger text-sm px-3 py-1"
          >
            PDF
          </button>
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        {/* Help Button */}
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header
