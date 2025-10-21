import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap, Node, Edge } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

function Canvas() {
  return (
    <div className="h-screen w-full">
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}

export default Canvas
