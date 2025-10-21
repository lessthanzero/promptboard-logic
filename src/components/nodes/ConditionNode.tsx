import React, { useState, useRef, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { usePromptBoardStore } from '../../lib/store'
import { useDebounce } from '../../hooks/useDebounce'

const ConditionNode: React.FC<NodeProps> = ({ id, data }) => {
  const { updateNode, deleteNode, getSuggestions } = usePromptBoardStore()
  const [isEditing, setIsEditing] = useState(false)
  const [tempLabel, setTempLabel] = useState(data.label || '')
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Debounce label changes for AI suggestions
  const debouncedLabel = useDebounce(data.label, 1000)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Trigger AI suggestions when label changes (debounced)
  useEffect(() => {
    if (debouncedLabel && debouncedLabel !== data.label) {
      getSuggestions(id)
    }
  }, [debouncedLabel, id, getSuggestions, data.label])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setTempLabel(data.label || '')
  }

  const handleSave = () => {
    if (tempLabel.trim()) {
      updateNode(id, { label: tempLabel.trim() })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempLabel(data.label || '')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleDelete = () => {
    deleteNode(id)
  }

  return (
    <div className="bg-blue-100 border-2 border-blue-500 text-blue-900 rounded-lg p-3 min-w-[120px] relative group">
      {/* Type Badge */}
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
        Condition
      </div>
      
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -left-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs"
      >
        ×
      </button>

      {/* Node Content */}
      <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
        {isEditing ? (
          <input
            ref={inputRef}
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-blue-900 font-medium"
          />
        ) : (
          <div className="text-sm font-medium text-center">
            {data.label || 'Double-click to edit'}
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  )
}

export default ConditionNode
