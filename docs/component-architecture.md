# Component Architecture - Persona-Aware Design

## 🏗️ **Enhanced Component Hierarchy**

```
App
├── Header (Navigation + Export + User Context)
│   ├── Logo: "PromptBoard"
│   ├── Actions: [New] [Open] [Save]
│   ├── Export: [JSON] [Markdown] [PDF]
│   ├── Help: [? Help] [Shortcuts]
│   └── Theme: [Light] [Dark] [Auto]
├── MainLayout (3-column grid, tablet-optimized)
│   ├── PromptPanel (Left - 320px min-width)
│   │   ├── PromptInput
│   │   │   ├── Textarea (auto-resize, auto-save)
│   │   │   ├── Placeholder (context-aware)
│   │   │   └── CharacterCount (optional)
│   │   ├── ActionButtons
│   │   │   ├── [Generate Logic] (primary)
│   │   │   ├── [Sample] (secondary)
│   │   │   ├── [Clear] (destructive)
│   │   │   └── [Sync to Text] (tertiary)
│   │   ├── HintsCard (context-aware)
│   │   │   ├── Tips (based on mode)
│   │   │   ├── Examples (mode-specific)
│   │   │   └── Shortcuts (keyboard)
│   │   └── UserContext (mode selector)
│   │       ├── ModeDropdown: [PM ▼] [Researcher] [Custom...]
│   │       ├── CustomModeInput (when Custom selected)
│   │       └── ModeDescription (contextual help)
│   ├── CanvasArea (Center - flex-grow)
│   │   ├── ReactFlowProvider
│   │   ├── EmptyState (conditional)
│   │   │   ├── Icon (lightbulb)
│   │   │   ├── Title: "No logic yet"
│   │   │   ├── Description (mode-specific)
│   │   │   ├── CTA: "Paste text on the left"
│   │   │   └── SampleButton: "Try Sample"
│   │   ├── LoadingOverlay (conditional)
│   │   │   ├── Spinner (animated)
│   │   │   ├── Title: "Analyzing your logic..."
│   │   │   ├── Description (contextual)
│   │   │   └── Progress (optional)
│   │   ├── ErrorBoundary
│   │   │   ├── ErrorIcon (warning)
│   │   │   ├── Title (error type)
│   │   │   ├── Message (user-friendly)
│   │   │   ├── Suggestions (actionable)
│   │   │   └── Actions: [Try Again] [Use Sample] [Get Help]
│   │   └── CustomNodes
│   │       ├── ConditionNode (blue, diamond, handles)
│   │       │   ├── NodeContent (editable)
│   │       │   ├── TypeBadge: "Condition"
│   │       │   ├── Handles (top, bottom)
│   │       │   └── DeleteButton (×)
│   │       ├── ActionNode (green, rectangular, handles)
│   │       │   ├── NodeContent (editable)
│   │       │   ├── TypeBadge: "Action"
│   │       │   ├── Handles (left, right)
│   │       │   └── DeleteButton (×)
│   │       └── OutcomeNode (orange, rounded, handles)
│   │           ├── NodeContent (editable)
│   │           ├── TypeBadge: "Outcome"
│   │           ├── Handles (top, bottom)
│   │           └── DeleteButton (×)
│   └── Sidebar (Right - 320px min-width)
│       ├── Tabs (shadcn/ui)
│       │   ├── [JSON View] (default)
│       │   └── [AI Assistant]
│       ├── JSONView (read-only)
│       │   ├── SyntaxHighlighting (monospace)
│       │   ├── CopyButton
│       │   ├── DownloadButton
│       │   └── FormatToggle (pretty/compact)
│       ├── AssistantPanel
│       │   ├── SuggestionCards
│       │   │   ├── Card (shadcn/ui)
│       │   │   │   ├── Icon (contextual)
│       │   │   │   ├── Text (suggestion)
│       │   │   │   ├── Confidence (0-100%)
│       │   │   │   ├── [Apply] (primary)
│       │   │   │   └── [Dismiss] (secondary)
│       │   │   └── EmptyState (no suggestions)
│       │   ├── SuggestionHistory (optional)
│       │   └── Settings (AI preferences)
│       └── ExportPanel (future)
│           ├── [Download JSON]
│           ├── [Download Markdown]
│           └── [Download PDF]
└── Toaster (notifications + error recovery)
    ├── SuccessToast (green)
    ├── ErrorToast (red)
    ├── InfoToast (blue)
    └── LoadingToast (gray)
```

---

## 🎭 **Persona-Aware Components**

### **Mode Selector Component**
```typescript
interface ModeSelectorProps {
  currentMode: 'pm' | 'researcher' | 'custom'
  onModeChange: (mode: string) => void
  customModes: string[]
  onAddCustomMode: (name: string) => void
}

// Default modes with editable names
const defaultModes = {
  pm: 'Product Manager',
  researcher: 'Researcher',
  custom: 'Custom...'
}
```

### **Context-Aware Hints**
```typescript
interface HintsCardProps {
  mode: 'pm' | 'researcher' | 'custom'
  context: 'empty' | 'editing' | 'generating'
}

const hintsByMode = {
  pm: {
    empty: "Describe business logic in simple terms",
    editing: "Consider user impact and business metrics",
    generating: "AI will suggest business-relevant improvements"
  },
  researcher: {
    empty: "Structure qualitative insights into logic",
    editing: "Think about causal relationships and evidence",
    generating: "AI will suggest research-relevant connections"
  },
  custom: {
    empty: "Describe your personal or custom logic",
    editing: "Consider all possible outcomes and scenarios",
    generating: "AI will suggest improvements based on your context"
  }
}
```

### **Mode-Specific Empty States**
```typescript
interface EmptyStateProps {
  mode: 'pm' | 'researcher' | 'custom'
  onSampleClick: () => void
}

const emptyStatesByMode = {
  pm: {
    title: "No business logic yet",
    description: "Describe your product decisions and user flows",
    sampleText: "If user skips onboarding, show tooltip, else proceed to dashboard"
  },
  researcher: {
    title: "No research logic yet", 
    description: "Structure your qualitative insights into causal relationships",
    sampleText: "If user encounters error, they may abandon the process"
  },
  custom: {
    title: "No personal logic yet",
    description: "Describe your decision-making process and outcomes",
    sampleText: "If I find a job with salary >$80k, I stay here, else move"
  }
}
```

---

## 📱 **Tablet Optimizations**

### **Touch-Friendly Design**
```css
/* Minimum touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Generous spacing for fingers */
.touch-spacing {
  padding: 12px 16px;
  margin: 8px;
}

/* Readable text sizes */
.touch-text {
  font-size: 16px;
  line-height: 1.5;
}
```

### **Responsive Grid**
```css
/* Tablet portrait */
@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
}

/* Tablet landscape */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 320px 1fr 320px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .main-layout {
    grid-template-columns: 320px 1fr 320px;
  }
}
```

---

## 🎨 **Design Tokens**

### **Node Styling**
```css
/* Condition Node (Blue) */
.condition-node {
  @apply bg-blue-100 border-blue-500 text-blue-900;
  @apply focus:ring-2 focus:ring-blue-300;
  @apply aria-selected:bg-blue-200;
  @apply hover:bg-blue-50;
  @apply transition-colors duration-200;
}

/* Action Node (Green) */
.action-node {
  @apply bg-green-100 border-green-500 text-green-900;
  @apply focus:ring-2 focus:ring-green-300;
  @apply aria-selected:bg-green-200;
  @apply hover:bg-green-50;
  @apply transition-colors duration-200;
}

/* Outcome Node (Orange) */
.outcome-node {
  @apply bg-orange-100 border-orange-500 text-orange-900;
  @apply focus:ring-2 focus:ring-orange-300;
  @apply aria-selected:bg-orange-200;
  @apply hover:bg-orange-50;
  @apply transition-colors duration-200;
}
```

### **Mode Themes**
```css
/* PM Theme (Business) */
.pm-theme {
  @apply bg-gray-50 text-gray-900;
  --primary: theme('colors.blue.500');
  --secondary: theme('colors.gray.500');
}

/* Researcher Theme (Academic) */
.researcher-theme {
  @apply bg-slate-50 text-slate-900;
  --primary: theme('colors.teal.500');
  --secondary: theme('colors.slate.500');
}

/* Custom Theme (User-defined) */
.custom-theme {
  @apply bg-purple-50 text-purple-900;
  --primary: theme('colors.purple.500');
  --secondary: theme('colors.purple.500');
}
```

---

## 🚀 **Future: Executable Logic Framework**

### **Execution Component Architecture**
```
ExecutionFramework (future)
├── ExecutionButton (▶️ Execute)
├── InputPanel
│   ├── SliderInput (salary range)
│   ├── TextInput (location)
│   ├── NumberInput (percentage)
│   └── BooleanInput (yes/no)
├── ExecutionEngine
│   ├── LogicParser (convert nodes to executable)
│   ├── InputValidator (validate user inputs)
│   ├── ExecutionRunner (run logic with inputs)
│   └── ResultCalculator (compute outcomes)
├── ResultsPanel
│   ├── OutcomeDisplay (visual results)
│   ├── ScenarioComparison (what-if analysis)
│   ├── ExportResults (save execution data)
│   └── ShareResults (collaborate)
└── ExecutionHistory
    ├── PreviousRuns (saved executions)
    ├── ScenarioLibrary (common scenarios)
    └── ExportHistory (download results)
```

### **Implementation Timeline**
- **Day 4**: Add execution framework to component architecture
- **Day 5**: Implement basic execution with mock data
- **Post-MVP**: Real-time execution with user inputs
- **Future**: Advanced scenarios and collaboration

---

## 🔧 **Technical Specifications**

### **State Management**
```typescript
interface AppState {
  // Core logic
  nodes: LogicNode[]
  edges: LogicEdge[]
  promptText: string
  
  // UI state
  selectedMode: 'pm' | 'researcher' | 'custom'
  customModes: string[]
  isGenerating: boolean
  isExecuting: boolean
  
  // Assistant state
  suggestions: Suggestion[]
  suggestionHistory: Suggestion[]
  
  // Execution state (future)
  executionInputs: Record<string, any>
  executionResults: ExecutionResult[]
  executionHistory: ExecutionRun[]
}
```

### **Performance Considerations**
- **Canvas**: Virtualized rendering for 20+ nodes
- **State**: Debounced updates to prevent excessive re-renders
- **Memory**: Efficient node/edge storage and updates
- **Network**: Optimistic updates with error recovery

### **Accessibility Features**
- **Keyboard Navigation**: Full canvas control
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliance (future)
