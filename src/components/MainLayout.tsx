import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable'
import Header from './Header'
import PromptPanel from './PromptPanel'
import CanvasArea from './CanvasArea'
import Sidebar from './Sidebar'

const MainLayout: React.FC = () => {

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Status Bar */}
      <div className="bg-gray-100 border-b px-6 py-2 flex items-center justify-center">
        <p className="text-sm text-gray-600">Analyzing your logic...</p>
      </div>

      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Prompt Input (25%) */}
          <ResizablePanel defaultSize={25} minSize={15}>
            <PromptPanel />
          </ResizablePanel>

          <ResizableHandle />

          {/* Center Panel - Canvas (50%) */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <CanvasArea />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Sidebar (25%) */}
          <ResizablePanel defaultSize={25} minSize={15}>
            <Sidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default MainLayout
