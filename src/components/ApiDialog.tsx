import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface ApiDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ApiDialog: React.FC<ApiDialogProps> = ({ open, onOpenChange }) => {
  const [apiKey, setApiKey] = useState('')

  const handleCheckKey = () => {
    // Mock functionality for now
    console.log('Checking API key...')
  }

  const handleApply = () => {
    // Mock functionality for now
    console.log('API key applied')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set API key</DialogTitle>
          <DialogDescription>
            Enter your API key to connect to the AI service.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API key</Label>
            <Input
              id="apiKey"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleCheckKey}>
            Check the key
          </Button>
          <Button onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApiDialog
