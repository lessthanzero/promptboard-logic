import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

const CanvasArea: React.FC = () => {

  return (
    <div className="h-full relative bg-gray-50">
      {/* Canvas Dotted Background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle, rgb(107 114 128 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Logic Flow Visualization */}
      <div className="relative h-full flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {/* Noodle connectors */}
          {/* Yes path from Condition to Action */}
          <path
            d="M 500 180 C 500 220, 440 220, 440 260"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
          />
          {/* No path from Condition (going right) */}
          <path
            d="M 560 160 C 620 160, 620 220, 620 280"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2.5"
            strokeDasharray="5,5"
          />
          {/* Path from Action to Outcome */}
          <path
            d="M 440 315 C 440 350, 480 350, 480 380"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
          />
        </svg>

        {/* Condition Node */}
        <div className="absolute" style={{ top: '120px', left: '420px', zIndex: 2 }}>
          <Card className="w-56 shadow-lg bg-white border-gray-200">
            <CardContent className="p-3">
              <Badge variant="outline" className="mb-2">condition</Badge>
              <p className="text-sm text-left text-gray-900">User skips onboarding?</p>
            </CardContent>
          </Card>
          {/* Labels for connectors */}
          <div className="absolute" style={{ top: '50px', left: '-30px' }}>
            <span className="text-xs text-blue-600">yes</span>
          </div>
          <div className="absolute" style={{ top: '30px', right: '-30px' }}>
            <span className="text-xs text-gray-500">no</span>
          </div>
        </div>

        {/* Action Node */}
        <div className="absolute" style={{ top: '260px', left: '360px', zIndex: 2 }}>
          <Card className="w-40 shadow-lg bg-white border-gray-200">
            <CardContent className="p-3">
              <Badge variant="secondary" className="mb-2">action</Badge>
              <p className="text-sm text-left text-gray-900">Show tooltip reminder</p>
            </CardContent>
          </Card>
        </div>

        {/* Outcome Node */}
        <div className="absolute" style={{ top: '380px', left: '360px', zIndex: 2 }}>
          <Card className="w-64 shadow-lg bg-white border-gray-200">
            <CardContent className="p-3">
              <Badge variant="default" className="mb-2">outcome</Badge>
              <p className="text-sm text-left text-gray-900">Reduced confusion</p>
              <p className="text-xs text-gray-500 mt-1 text-left">Stopping flow</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CanvasArea
