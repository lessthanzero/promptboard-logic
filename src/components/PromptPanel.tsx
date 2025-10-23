import React, { useState } from 'react'
import { usePromptBoardStore } from '../lib/store'
import { useToastContext } from '../contexts/ToastContext'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Sparkles, TestTube, RefreshCw, Trash2, Key } from 'lucide-react'
import ApiDialog from './ApiDialog'

const PromptPanel: React.FC = () => {
  const { promptText, setPromptText, clearAll, loadMockData, generateLogic, isAnalyzing, syncToText } = usePromptBoardStore()
  const { showSuccess, showError } = useToastContext()
  const [apiDialogOpen, setApiDialogOpen] = useState(false)

  const handleGenerate = async () => {
    if (promptText.trim()) {
      try {
        await generateLogic(promptText.trim())
        showSuccess('Logic Generated!', 'Your logic graph has been created successfully.')
      } catch (error) {
        showError('Generation Failed', 'Failed to generate logic. Please try again.')
      }
    }
  }

  const handleSample = () => {
    loadMockData()
    showSuccess('Sample Loaded!', 'Mock data has been loaded successfully.')
  }

  const handleClear = () => {
    clearAll()
    showSuccess('Canvas Cleared!', 'All nodes and edges have been removed.')
  }

  const handleSync = async () => {
    try {
      await syncToText()
      showSuccess('Synced to Text!', 'Graph has been converted to text format.')
    } catch (error) {
      showError('Sync Failed', 'Failed to sync graph to text.')
    }
  }

  return (
    <Card className="h-full rounded-none border-0 border-r">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Preset</CardTitle>
        <Select defaultValue="PM">
          <SelectTrigger className="w-full mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PM">PM</SelectItem>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="CxO">CxO</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg">Logic summary</h3>
          <Textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Describe your logic here..."
            className="min-h-[200px] resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleGenerate}
            disabled={isAnalyzing || !promptText.trim()}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate logic
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleSample}
          >
            <TestTube className="w-4 h-4 mr-2" />
            Sample
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleSync}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync to text
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleClear}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => setApiDialogOpen(true)}
          >
            <Key className="w-4 h-4 mr-2" />
            Set API
          </Button>
        </div>
      </CardContent>
      <ApiDialog open={apiDialogOpen} onOpenChange={setApiDialogOpen} />
    </Card>
  )
}

export default PromptPanel
