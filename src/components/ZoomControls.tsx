import React from 'react';
import { Button } from './ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Move } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onZoomToFit: () => void;
  onCenterContent: () => void;
  currentZoom: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onZoomToFit,
  onCenterContent,
  currentZoom
}) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border z-50">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onZoomOut();
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <div className="px-3 py-1 text-xs font-medium bg-muted rounded min-w-[50px] text-center">
          {Math.round(currentZoom * 100)}%
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onZoomIn();
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onResetZoom();
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Reset Zoom"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onZoomToFit();
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Zoom to Fit"
        >
          <Maximize className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCenterContent();
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Center Content"
        >
          <Move className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ZoomControls;
