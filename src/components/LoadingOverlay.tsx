import React from 'react'

const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing your logic...</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
