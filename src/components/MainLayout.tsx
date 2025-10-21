import React from 'react'
import Header from './Header'
import PromptPanel from './PromptPanel'
import CanvasArea from './CanvasArea'
import Sidebar from './Sidebar'

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-4">
        {/* Left Panel - Prompt Input (1/4 width) */}
        <div className="min-h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
          <PromptPanel />
        </div>
        
        {/* Center Panel - Canvas (2/4 width) */}
        <div className="col-span-2 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <CanvasArea />
        </div>
        
        {/* Right Panel - Sidebar (1/4 width) */}
        <div className="min-h-screen border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
