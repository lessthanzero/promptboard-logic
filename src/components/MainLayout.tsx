import React, { useState, useEffect } from 'react'
import Header from './Header'
import PromptPanel from './PromptPanel'
import CanvasArea from './CanvasArea'
import Sidebar from './Sidebar'
import ResizablePanel from './ResizablePanel'

const MainLayout: React.FC = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(320)
  const [rightPanelWidth, setRightPanelWidth] = useState(320)

  // Load panel sizes from localStorage on mount
  useEffect(() => {
    const savedLeftWidth = localStorage.getItem('promptboard-left-panel-width')
    const savedRightWidth = localStorage.getItem('promptboard-right-panel-width')
    
    if (savedLeftWidth) {
      setLeftPanelWidth(parseInt(savedLeftWidth, 10))
    }
    if (savedRightWidth) {
      setRightPanelWidth(parseInt(savedRightWidth, 10))
    }
  }, [])

  // Save panel sizes to localStorage
  const handleLeftPanelResize = (width: number) => {
    setLeftPanelWidth(width)
    localStorage.setItem('promptboard-left-panel-width', width.toString())
  }

  const handleRightPanelResize = (width: number) => {
    setRightPanelWidth(width)
    localStorage.setItem('promptboard-right-panel-width', width.toString())
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Prompt Input (resizable) */}
        <ResizablePanel
          initialWidth={leftPanelWidth}
          minWidth={200}
          maxWidth={600}
          onResize={handleLeftPanelResize}
          className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto"
        >
          <PromptPanel />
        </ResizablePanel>
        
        {/* Center Panel - Canvas (flexible) */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <CanvasArea />
        </div>
        
        {/* Right Panel - Sidebar (resizable) */}
        <ResizablePanel
          initialWidth={rightPanelWidth}
          minWidth={200}
          maxWidth={600}
          onResize={handleRightPanelResize}
          className="border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto"
        >
          <Sidebar />
        </ResizablePanel>
      </div>
    </div>
  )
}

export default MainLayout
