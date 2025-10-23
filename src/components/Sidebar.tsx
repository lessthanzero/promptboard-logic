import React, { useState } from 'react'
import { usePromptBoardStore } from '../lib/store'
import AssistantPanel from './AssistantPanel'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Copy, Check } from 'lucide-react'

const Sidebar: React.FC = () => {
  const { nodes, edges } = usePromptBoardStore()
  const [activeTab, setActiveTab] = useState<'json' | 'assistant'>('json')
  const [copied, setCopied] = useState(false)

  const jsonData = {
    nodes,
    edges,
    timestamp: new Date().toISOString()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-full rounded-none border-0 border-l flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'json' | 'assistant')}>
              <TabsList>
                <TabsTrigger value="json">JSON view</TabsTrigger>
                <TabsTrigger value="assistant">AI assistant</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Logic structure</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-1" />
            ) : (
              <Copy className="w-4 h-4 mr-1" />
            )}
            Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {activeTab === 'json' ? (
          <div className="h-full overflow-auto">
            <pre className="text-xs bg-muted p-4 rounded-lg h-full">
              <code>{JSON.stringify(jsonData, null, 2)}</code>
            </pre>
          </div>
        ) : (
          <AssistantPanel />
        )}
      </CardContent>
    </Card>
  )
}

export default Sidebar
