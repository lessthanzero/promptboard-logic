import React from 'react'
import { usePromptBoardStore } from '../lib/store'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { FileJson, FileText, FileDown, Play } from 'lucide-react'

const Header: React.FC = () => {
  const { exportJSON, exportMarkdown, exportPDF } = usePromptBoardStore()

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-extrabold">PromptBoard</h1>
        <Badge variant="secondary">AI Logic Board</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={exportJSON}>
          <FileJson className="w-4 h-4 mr-1" />
          JSON
        </Button>
        <Button variant="outline" size="sm" onClick={exportMarkdown}>
          <FileText className="w-4 h-4 mr-1" />
          Markdown
        </Button>
        <Button variant="outline" size="sm" onClick={exportPDF}>
          <FileDown className="w-4 h-4 mr-1" />
          PDF
        </Button>
        <Button variant="default" size="sm">
          <Play className="w-4 h-4 mr-1" />
          Execute
        </Button>
      </div>
    </header>
  )
}

export default Header
