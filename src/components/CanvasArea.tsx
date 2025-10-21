import React from 'react'
import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap } from 'reactflow'
import { usePromptBoardStore } from '../lib/store'
import { nodeTypes } from '../components/nodes'
import EmptyState from './EmptyState'
import LoadingOverlay from './LoadingOverlay'
import 'reactflow/dist/style.css'

const CanvasArea: React.FC = () => {
  const { nodes, edges } = usePromptBoardStore()

  return (
    <div className="h-full relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
        
        {/* Empty State */}
        {nodes.length === 0 && <EmptyState />}
        
        {/* Loading Overlay */}
        <LoadingOverlay />
      </ReactFlowProvider>
    </div>
  )
}

export default CanvasArea
