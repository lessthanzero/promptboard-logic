import React, { useState, useCallback, useRef } from 'react';

interface WorkspaceState {
  zoom: number;
  panX: number;
  panY: number;
}

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.1;

export const useWorkspaceNavigation = () => {
  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>({
    zoom: 1,
    panX: 0,
    panY: 0
  });

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + ZOOM_STEP, MAX_ZOOM)
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - ZOOM_STEP, MIN_ZOOM)
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setWorkspaceState(prev => ({
      ...prev,
      zoom: 1
    }));
  }, []);

  const zoomToFit = useCallback((containerWidth: number, containerHeight: number, contentBounds: { width: number; height: number; x: number; y: number }) => {
    const padding = 50; // Padding around content
    const scaleX = (containerWidth - padding * 2) / contentBounds.width;
    const scaleY = (containerHeight - padding * 2) / contentBounds.height;
    const scale = Math.min(scaleX, scaleY, MAX_ZOOM);
    
    const centerX = (containerWidth - contentBounds.width * scale) / 2;
    const centerY = (containerHeight - contentBounds.height * scale) / 2;
    
    setWorkspaceState({
      zoom: scale,
      panX: centerX - contentBounds.x * scale,
      panY: centerY - contentBounds.y * scale
    });
  }, []);

  const centerOnContent = useCallback((containerWidth: number, containerHeight: number, contentBounds: { width: number; height: number; x: number; y: number }) => {
    const centerX = (containerWidth - contentBounds.width * workspaceState.zoom) / 2;
    const centerY = (containerHeight - contentBounds.height * workspaceState.zoom) / 2;
    
    setWorkspaceState(prev => ({
      ...prev,
      panX: centerX - contentBounds.x * prev.zoom,
      panY: centerY - contentBounds.y * prev.zoom
    }));
  }, [workspaceState.zoom]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setWorkspaceState(prev => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta))
    }));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setWorkspaceState(prev => ({
      ...prev,
      panX: prev.panX + deltaX,
      panY: prev.panY + deltaY
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const getTransform = useCallback(() => {
    return `translate(${workspaceState.panX}px, ${workspaceState.panY}px) scale(${workspaceState.zoom})`;
  }, [workspaceState]);

  return {
    workspaceState,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomToFit,
    centerOnContent,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getTransform
  };
};
