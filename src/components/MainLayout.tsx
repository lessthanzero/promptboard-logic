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
      <div className="flex-1 grid grid-cols-3">
        {/* Left Panel - Prompt Input */}
        <div className="min-w-[320px] border-r border-gray-200 bg-white">
          <PromptPanel />
        </div>
        
        {/* Center Panel - Canvas */}
        <div className="flex-1 bg-gray-50">
          <CanvasArea />
        </div>
        
        {/* Right Panel - Sidebar */}
        <div className="min-w-[320px] border-l border-gray-200 bg-white">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
