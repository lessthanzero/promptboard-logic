import { useEffect } from 'react'
import { usePromptBoardStore } from '../lib/store'
import { useToastContext } from '../contexts/ToastContext'

export const useKeyboardShortcuts = () => {
  const { 
    generateLogic, 
    promptText, 
    clearAll, 
    loadMockData, 
    syncToText,
    exportJSON,
    exportMarkdown,
    exportPDF,
    undo,
    redo,
    canUndo,
    canRedo
  } = usePromptBoardStore()
  
  const { showSuccess, showInfo } = useToastContext()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return
      }

      // Cmd/Ctrl + K - Command palette (placeholder)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        showInfo('Command Palette', 'Command palette coming soon!')
      }

      // Cmd/Ctrl + S - Save/Export JSON
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        exportJSON()
        showSuccess('Saved!', 'Logic exported as JSON')
      }

      // Cmd/Ctrl + Shift + S - Export Markdown
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'S') {
        event.preventDefault()
        exportMarkdown()
        showSuccess('Exported!', 'Logic exported as Markdown')
      }

      // Cmd/Ctrl + Enter - Generate Logic
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        if (promptText.trim()) {
          generateLogic(promptText.trim())
          showSuccess('Generating...', 'Creating logic from prompt')
        }
      }

      // Cmd/Ctrl + Shift + Enter - Load Sample
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'Enter') {
        event.preventDefault()
        loadMockData()
        showSuccess('Sample Loaded!', 'Mock data has been loaded')
      }

      // Cmd/Ctrl + T - Sync to Text
      if ((event.metaKey || event.ctrlKey) && event.key === 't') {
        event.preventDefault()
        syncToText()
        showSuccess('Synced!', 'Graph converted to text')
      }

      // Cmd/Ctrl + Z - Undo
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault()
        if (canUndo()) {
          undo()
          showSuccess('Undone!', 'Previous action undone')
        }
      }

      // Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y - Redo
      if (((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'Z') || 
          ((event.metaKey || event.ctrlKey) && event.key === 'y')) {
        event.preventDefault()
        if (canRedo()) {
          redo()
          showSuccess('Redone!', 'Action redone')
        }
      }

      // Cmd/Ctrl + Delete - Clear All
      if ((event.metaKey || event.ctrlKey) && event.key === 'Delete') {
        event.preventDefault()
        clearAll()
        showSuccess('Cleared!', 'All nodes and edges removed')
      }

      // Escape - Close any modals (placeholder)
      if (event.key === 'Escape') {
        event.preventDefault()
        showInfo('Escape', 'No modals to close')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [
    generateLogic, 
    promptText, 
    clearAll, 
    loadMockData, 
    syncToText,
    exportJSON,
    exportMarkdown,
    exportPDF,
    undo,
    redo,
    canUndo,
    canRedo,
    showSuccess,
    showInfo
  ])
}
