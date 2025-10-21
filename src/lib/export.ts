import { LogicNode, LogicEdge } from './store'

export interface ExportData {
  nodes: LogicNode[]
  edges: LogicEdge[]
  promptText: string
  timestamp: string
  version: string
}

// Export to JSON
export const exportToJSON = (data: ExportData): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `promptboard-logic-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Export to Markdown
export const exportToMarkdown = (data: ExportData): void => {
  const markdown = generateMarkdown(data)
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `promptboard-logic-${new Date().toISOString().split('T')[0]}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Export to PDF (using browser print)
export const exportToPDF = (): void => {
  window.print()
}

// Generate Markdown content
const generateMarkdown = (data: ExportData): string => {
  let markdown = `# PromptBoard Logic\n\n`
  markdown += `**Generated:** ${new Date(data.timestamp).toLocaleString()}\n\n`
  
  if (data.promptText) {
    markdown += `## Original Prompt\n\n${data.promptText}\n\n`
  }
  
  markdown += `## Logic Structure\n\n`
  
  // Find root nodes (no incoming edges)
  const rootNodes = data.nodes.filter(node => 
    !data.edges.some(edge => edge.target === node.id)
  )
  
  // Find leaf nodes (no outgoing edges)
  const leafNodes = data.nodes.filter(node => 
    !data.edges.some(edge => edge.source === node.id)
  )
  
  markdown += `### Root Conditions\n\n`
  rootNodes.forEach(node => {
    markdown += `- **${node.label}**\n`
  })
  
  markdown += `\n### Final Outcomes\n\n`
  leafNodes.forEach(node => {
    markdown += `- **${node.label}**\n`
  })
  
  markdown += `\n### Logic Flow\n\n`
  
  // Generate flow description
  rootNodes.forEach(root => {
    markdown += `**If ${root.label}:**\n\n`
    
    const connectedEdges = data.edges.filter(edge => edge.source === root.id)
    connectedEdges.forEach(edge => {
      const targetNode = data.nodes.find(n => n.id === edge.target)
      if (targetNode) {
        const label = edge.label ? ` (${edge.label})` : ''
        markdown += `- ${targetNode.label}${label}\n`
      }
    })
    markdown += `\n`
  })
  
  markdown += `## Data Export\n\n`
  markdown += `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`
  
  return markdown
}

// Generate summary text
export const generateSummary = (nodes: LogicNode[], edges: LogicEdge[]): string => {
  const rootNodes = nodes.filter(node => 
    !edges.some(edge => edge.target === node.id)
  )
  
  let summary = ''
  
  rootNodes.forEach(root => {
    summary += `If ${root.label.toLowerCase()}, then:\n`
    
    const connectedEdges = edges.filter(edge => edge.source === root.id)
    connectedEdges.forEach(edge => {
      const targetNode = nodes.find(n => n.id === edge.target)
      if (targetNode) {
        summary += `  - ${targetNode.label}\n`
      }
    })
    summary += '\n'
  })
  
  return summary.trim()
}
