import React, { useMemo } from 'react'
import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap } from 'reactflow'
import { usePromptBoardStore } from '../lib/store'
import { nodeTypes } from '../components/nodes'
import EmptyState from './EmptyState'
import LoadingOverlay from './LoadingOverlay'
import 'reactflow/dist/style.css'

const CanvasArea: React.FC = () => {
  const { nodes, edges } = usePromptBoardStore()

  // Memoize nodes and edges for performance
  const memoizedNodes = useMemo(() => nodes, [nodes])
  const memoizedEdges = useMemo(() => edges, [edges])

  // Performance optimization for large graphs
  const isLargeGraph = nodes.length > 20
  const nodeTypesOptimized = useMemo(() => nodeTypes, [])

  return (
    <div className="h-full relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={memoizedNodes}
          edges={memoizedEdges}
          nodeTypes={nodeTypesOptimized}
          fitView
          className="bg-gray-50"
          // Performance optimizations
          nodesDraggable={!isLargeGraph}
          nodesConnectable={!isLargeGraph}
          elementsSelectable={!isLargeGraph}
          // Virtualization settings
          onlyRenderVisibleElements={isLargeGraph}
          // Layout optimization
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background 
            gap={isLargeGraph ? 20 : 12} 
            size={isLargeGraph ? 0.5 : 1}
          />
          <Controls 
            showInteractive={!isLargeGraph}
            showZoom={true}
            showFitView={true}
          />
          <MiniMap 
            nodeStrokeColor="#94a3b8"
            nodeColor="#f1f5f9"
            nodeBorderRadius={4}
            maskColor="rgba(0, 0, 0, 0.1)"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #e2e8f0'
            }}
          />
        </ReactFlow>
        
        {/* Empty State */}
        {nodes.length === 0 && <EmptyState />}
        
        {/* Loading Overlay */}
        <LoadingOverlay />
        
        {/* Performance Warning for Large Graphs */}
        {isLargeGraph && (
          <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="text-yellow-600">⚠️</div>
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Large Graph</p>
                <p className="text-yellow-700">
                  Some interactions disabled for performance
                </p>
              </div>
            </div>
          </div>
        )}
      </ReactFlowProvider>
    </div>
  )
}

export default CanvasArea
