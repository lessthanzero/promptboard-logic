import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { FileJson, FileText, FileDown, Copy, Check, Sparkles, TestTube, Trash2, RefreshCw, Key, Play } from 'lucide-react';
import LogicNode from './components/LogicNode';
import ZoomControls from './components/ZoomControls';
import { useWorkspaceNavigation } from './hooks/useWorkspaceNavigation';
import mockData from '../mocks/ai-responses.json';

export default function App() {
  const [logicType, setLogicType] = useState('PM');
  const [activeView, setActiveView] = useState('JSON View');
  const [copied, setCopied] = useState(false);
  const [logicSummary, setLogicSummary] = useState(
    'If dfdf, then:\n  → show tooltip reminder\n\nIf normal flow, then:'
  );
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Workspace navigation
  const {
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
  } = useWorkspaceNavigation();

  // Use the first mock data scenario
  const currentScenario = mockData.samplePrompts[0];
  const logicStructure = {
    nodes: currentScenario.nodes,
    edges: currentScenario.edges
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(logicStructure, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckKey = () => {
    console.log('Checking API key...');
  };

  const handleApply = () => {
    console.log('API key applied');
    setApiDialogOpen(false);
  };

  // Button handlers
  const handleGenerateLogic = () => {
    // Map persona types to mock data scenarios
    const personaMap = {
      'PM': 0,        // onboarding-skip
      'Engineering': 1, // pricing-strategy  
      'Design': 2     // feature-rollout
    };
    
    const scenarioIndex = personaMap[logicType as keyof typeof personaMap] || 0;
    const scenario = mockData.samplePrompts[scenarioIndex];
    
    // Update the logic structure with the selected scenario
    // This would normally update the store, but for now we'll just log
    console.log('Generating logic for:', logicType, scenario);
    
    // In a real implementation, this would:
    // 1. Update the nodes and edges in the store
    // 2. Trigger a re-render of the canvas
    // 3. Show loading state
  };

  const handleSample = () => {
    const personaMap = {
      'PM': 0,        // onboarding-skip
      'Engineering': 1, // pricing-strategy  
      'Design': 2     // feature-rollout
    };
    
    const scenarioIndex = personaMap[logicType as keyof typeof personaMap] || 0;
    const scenario = mockData.samplePrompts[scenarioIndex];
    
    // Load the prompt text into Logic summary
    setLogicSummary(scenario.prompt);
  };

  const handleSyncToText = () => {
    // Reset to default preset based on current persona
    const defaultPresets = {
      'PM': 'If user skips onboarding, show tooltip reminder, else proceed to dashboard.',
      'Engineering': 'If we increase price by 20%, churn may rise but revenue increases. If churn rises too much, we need to add value.',
      'Design': 'If A/B test shows 20% improvement, roll out globally. If not, iterate and retest.'
    };
    
    setLogicSummary(defaultPresets[logicType as keyof typeof defaultPresets] || defaultPresets['PM']);
  };

  const handleClear = () => {
    // Clear all content
    setLogicSummary('');
    // In a real implementation, this would also:
    // 1. Clear nodes and edges from the store
    // 2. Reset the canvas
    // 3. Reset zoom/pan state
    console.log('Clearing all content');
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Status Bar */}
      <div className="bg-primary/10 border-b px-6 py-2 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Analyzing your logic...</p>
      </div>

      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">PromptBoard</h1>
          <Badge variant="secondary">AI Logic Board</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <FileJson className="w-4 h-4 mr-1" />
            JSON
          </Button>
          <Button variant="secondary" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Markdown
          </Button>
          <Button variant="secondary" size="sm">
            <FileDown className="w-4 h-4 mr-1" />
            PDF
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            <Play className="w-4 h-4 mr-1" />
            Execute
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Described Logic */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <Card className="h-full rounded-none border-0 border-r">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Preset</CardTitle>
                <Select value={logicType} onValueChange={setLogicType}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PM">PM</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg">Logic summary</h3>
                  <Textarea
                    value={logicSummary}
                    onChange={(e) => setLogicSummary(e.target.value)}
                    placeholder="Describe your logic here..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" size="sm" className="w-full justify-start" onClick={handleGenerateLogic}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate logic
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start" onClick={handleSample}>
                    <TestTube className="w-4 h-4 mr-2" />
                    Sample
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start" onClick={handleSyncToText}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync to text
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start" onClick={handleClear}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start" onClick={() => setApiDialogOpen(true)}>
                    <Key className="w-4 h-4 mr-2" />
                    Set API
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

              {/* Center Panel - Visual Canvas */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <div 
                  className="h-full relative bg-muted/20 overflow-hidden"
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ cursor: 'grab' }}
                >
                  {/* Canvas Dotted Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgb(156 163 175 / 0.4) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0',
                      backgroundRepeat: 'repeat',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  
                  {/* Zoom Controls */}
                  <ZoomControls
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                    onResetZoom={resetZoom}
                    onZoomToFit={() => {
                      // Calculate content bounds from nodes
                      const nodes = logicStructure.nodes;
                      if (nodes.length === 0) return;
                      
                      const minX = Math.min(...nodes.map(n => n.position.x * 3));
                      const maxX = Math.max(...nodes.map(n => (n.position.x * 3) + 224));
                      const minY = Math.min(...nodes.map(n => n.position.y * 2));
                      const maxY = Math.max(...nodes.map(n => (n.position.y * 2) + 80));
                      
                      const contentBounds = {
                        x: minX,
                        y: minY,
                        width: maxX - minX,
                        height: maxY - minY
                      };
                      
                      zoomToFit(800, 600, contentBounds); // Approximate panel size
                    }}
                    onCenterContent={() => {
                      const nodes = logicStructure.nodes;
                      if (nodes.length === 0) return;
                      
                      const minX = Math.min(...nodes.map(n => n.position.x * 3));
                      const maxX = Math.max(...nodes.map(n => (n.position.x * 3) + 224));
                      const minY = Math.min(...nodes.map(n => n.position.y * 2));
                      const maxY = Math.max(...nodes.map(n => (n.position.y * 2) + 80));
                      
                      const contentBounds = {
                        x: minX,
                        y: minY,
                        width: maxX - minX,
                        height: maxY - minY
                      };
                      
                      centerOnContent(800, 600, contentBounds);
                    }}
                    currentZoom={workspaceState.zoom}
                  />
              
                  {/* Logic Flow Visualization */}
                  <div className="relative h-full flex items-center justify-center">
                    {/* Single container with transform applied to both SVG and nodes */}
                    <div 
                      style={{ 
                        transform: getTransform(),
                        transformOrigin: '0 0',
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <svg 
                        className="absolute inset-0 w-full h-full pointer-events-none" 
                        style={{ 
                          zIndex: 1
                        }}
                      >
                        {/* Dynamic connection lines based on mock data */}
                        {logicStructure.edges?.map((edge) => {
                          const sourceNode = logicStructure.nodes.find(n => n.id === edge.source);
                          const targetNode = logicStructure.nodes.find(n => n.id === edge.target);
                          
                          if (!sourceNode || !targetNode) return null;
                          
                          // Calculate connection points (center of cards) with scaled positions
                          const sourceX = (sourceNode.position.x * 3) + 112; // Half of card width (224px)
                          const sourceY = (sourceNode.position.y * 2) + 40; // Half of card height (80px)
                          const targetX = (targetNode.position.x * 3) + 112;
                          const targetY = (targetNode.position.y * 2) + 40;
                          
                          return (
                            <g key={edge.id}>
                              {/* Connection line */}
                              <line
                                x1={sourceX}
                                y1={sourceY}
                                x2={targetX}
                                y2={targetY}
                                stroke={edge.label === 'no' ? "#6b7280" : "#3b82f6"}
                                strokeWidth="3"
                                strokeDasharray={edge.label === 'no' ? "5,5" : "none"}
                              />
                              
                              {/* Connection circles at endpoints */}
                              <circle
                                cx={sourceX}
                                cy={sourceY}
                                r="6"
                                fill={edge.label === 'no' ? "#6b7280" : "#3b82f6"}
                              />
                              <circle
                                cx={targetX}
                                cy={targetY}
                                r="6"
                                fill={edge.label === 'no' ? "#6b7280" : "#3b82f6"}
                              />
                              
                              {/* Label */}
                              {edge.label && (
                                <text
                                  x={(sourceX + targetX) / 2}
                                  y={(sourceY + targetY) / 2 - 10}
                                  textAnchor="middle"
                                  fill={edge.label === 'no' ? "#6b7280" : "#3b82f6"}
                                  fontSize="12"
                                >
                                  {edge.label}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Render logic nodes */}
                      {logicStructure.nodes.map((node) => {
                        // Scale up positions to prevent overlapping
                        const scaledPosition = {
                          x: node.position.x * 3, // Scale horizontally
                          y: node.position.y * 2  // Scale vertically
                        };
                        
                        return (
                          <LogicNode
                            key={node.id}
                            id={node.id}
                            type={node.type as 'condition' | 'action' | 'outcome'}
                            label={node.label}
                            position={scaledPosition}
                          />
                        );
                      })}
                    </div>
                  </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Logic Structure */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <Card className="h-full rounded-none border-0 border-l flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tabs value={activeView} onValueChange={setActiveView}>
                      <TabsList>
                        <TabsTrigger value="JSON View">JSON view</TabsTrigger>
                        <TabsTrigger value="AI Assistant">AI assistant</TabsTrigger>
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
                <div className="h-full overflow-auto">
                  <pre className="text-xs bg-muted p-4 rounded-lg h-full">
                    <code>{JSON.stringify(logicStructure, null, 2)}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* API Dialog */}
      <Dialog open={apiDialogOpen} onOpenChange={setApiDialogOpen}>
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
            <Button variant="outline" onClick={() => setApiDialogOpen(false)}>
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
    </div>
  );
}