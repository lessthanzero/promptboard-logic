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
import { FileJson, FileText, FileDown, Copy, Check, Sparkles, TestTube, Trash2, RefreshCw, Key, Play, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [logicType, setLogicType] = useState('PM');
  const [activeView, setActiveView] = useState('JSON View');
  const [copied, setCopied] = useState(false);
  const [logicSummary, setLogicSummary] = useState(
    'If dfdf, then:\n  → show tooltip reminder\n\nIf normal flow, then:'
  );
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState<{
    type: 'condition' | 'action' | 'outcome';
    id: string;
    content: string;
    badge: string;
  } | null>(null);
  const [executionHistory, setExecutionHistory] = useState<Array<{
    type: 'condition' | 'action' | 'outcome';
    id: string;
    content: string;
    badge: string;
  }>>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const logicStructure = {
    nodes: [
      {
        id: 'c1',
        type: 'condition',
        label: 'dfdsfdsfsdfsdfsdf',
        position: { x: 100, y: 100 }
      },
      {
        id: 'a1',
        type: 'action',
        label: 'dfsfds',
        position: { x: 50, y: 200 }
      },
      {
        id: 'o1',
        type: 'outcome',
        label: 'Reduced confusion',
        position: { x: 50, y: 300 }
      }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(logicStructure, null, 2));
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckKey = () => {
    toast.info('Checking API key...');
  };

  const handleApply = () => {
    toast.success('API key applied');
    setApiDialogOpen(false);
  };

  const handleExecute = () => {
    // Start execution with the first condition
    const firstStep = {
      type: 'condition' as const,
      id: 'node-1',
      content: 'dfdsfdsfsdfsdfsdf',
      badge: 'condition'
    };
    setCurrentStep(firstStep);
    setExecutionHistory([firstStep]);
    setCurrentHistoryIndex(0);
    setIsExecuting(true);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setCurrentStep(null);
    setExecutionHistory([]);
    setCurrentHistoryIndex(-1);
  };

  const addStepToHistory = (step: {
    type: 'condition' | 'action' | 'outcome';
    id: string;
    content: string;
    badge: string;
  }) => {
    // Truncate history after current index and add new step
    const newHistory = executionHistory.slice(0, currentHistoryIndex + 1);
    newHistory.push(step);
    setExecutionHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setCurrentStep(step);
  };

  const handleConditionResponse = (response: 'yes' | 'no') => {
    if (response === 'yes') {
      // Go to Action node
      addStepToHistory({
        type: 'action',
        id: 'node-2',
        content: 'dfsfds',
        badge: 'action'
      });
    } else {
      // For demo, end execution on "no"
      toast.info('No path selected - execution ended');
      handleStopExecution();
    }
  };

  const handleActionDone = () => {
    // Go to Outcome node
    addStepToHistory({
      type: 'outcome',
      id: 'node-3',
      content: 'Reduced confusion',
      badge: 'outcome'
    });
  };

  const handleBackward = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setCurrentStep(executionHistory[newIndex]);
    }
  };

  const handleForward = () => {
    if (currentHistoryIndex < executionHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setCurrentStep(executionHistory[newIndex]);
    }
  };

  const canGoBackward = currentHistoryIndex > 0;
  const canGoForward = currentHistoryIndex < executionHistory.length - 1;

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
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm" onClick={handleExecute}>
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
                  <Button variant="secondary" size="sm" className="w-full justify-start">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate logic
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start">
                    <TestTube className="w-4 h-4 mr-2" />
                    Sample
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync to text
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start">
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
            <div className="h-full relative bg-muted/20">
              {/* Canvas Dotted Background */}
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `radial-gradient(circle, rgb(156 163 175 / 0.4) 1px, transparent 1px)`,
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
                  <Card className="w-56 shadow-lg">
                    <CardContent className="p-3">
                      <Badge variant="outline" className="mb-2">condition</Badge>
                      <p className="text-sm text-left">dfdsfdsfsdfsdfsdf</p>
                    </CardContent>
                  </Card>
                  {/* Labels for connectors */}
                  <div className="absolute" style={{ top: '50px', left: '-30px' }}>
                    <span className="text-xs text-primary">yes</span>
                  </div>
                  <div className="absolute" style={{ top: '30px', right: '-30px' }}>
                    <span className="text-xs text-muted-foreground">no</span>
                  </div>
                </div>

                {/* Action Node */}
                <div className="absolute" style={{ top: '260px', left: '360px', zIndex: 2 }}>
                  <Card className="w-40 shadow-lg border-2">
                    <CardContent className="p-3">
                      <Badge variant="secondary" className="mb-2">action</Badge>
                      <p className="text-sm text-left">dfsfds</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Outcome Node */}
                <div className="absolute" style={{ top: '380px', left: '360px', zIndex: 2 }}>
                  <Card className="w-64 shadow-lg bg-primary/5">
                    <CardContent className="p-3">
                      <Badge variant="default" className="mb-2">outcome</Badge>
                      <p className="text-sm text-left">Reduced confusion</p>
                      <p className="text-xs text-muted-foreground mt-1 text-left">Stopping flow</p>
                    </CardContent>
                  </Card>
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

      {/* Execution Overlay */}
      {isExecuting && (
        <div className="fixed inset-0 bg-white/75 z-50 flex items-center justify-center">
          {/* Stop Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
            onClick={handleStopExecution}
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Execution Card */}
          {currentStep && (
            <div className="transform scale-150">
              <Card className="w-64 shadow-2xl">
                <CardContent className="p-4">
                  <Badge
                    variant={
                      currentStep.type === 'condition'
                        ? 'outline'
                        : currentStep.type === 'action'
                        ? 'secondary'
                        : 'default'
                    }
                    className="mb-3"
                  >
                    {currentStep.badge}
                  </Badge>
                  <p className="text-sm text-left mb-4">{currentStep.content}</p>

                  {/* Condition Buttons */}
                  {currentStep.type === 'condition' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleConditionResponse('yes')}
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleConditionResponse('no')}
                      >
                        No
                      </Button>
                    </div>
                  )}

                  {/* Action Button */}
                  {currentStep.type === 'action' && (
                    <div className="mt-4">
                      <Button size="sm" className="w-full" onClick={handleActionDone}>
                        Done
                      </Button>
                    </div>
                  )}

                  {/* Outcome - No button, just display */}
                  {currentStep.type === 'outcome' && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground text-left">
                        Stopping flow
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Arrows - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleBackward}
              disabled={!canGoBackward}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleForward}
              disabled={!canGoForward}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
