# MVP Scope & Feature Priority Matrix

## 🎯 Core Value Proposition
**AI Logic Board** — a reasoning canvas that transforms natural-language descriptions into interactive decision systems with a visible AI Assistant Panel that evolves with every edit.

---

## 📊 Feature Priority Matrix

| Feature | Priority | Status | Description | User Impact |
|---------|----------|--------|-------------|-------------|
| **Text Prompt → Logic JSON** | ✅ P0 | MVP | Parse natural language into structured nodes (`Condition`, `Action`, `Outcome`) | Core functionality |
| **React Flow Visualisation** | ✅ P0 | MVP | Render nodes and edges with zoom, pan, and color-coded types | Core functionality |
| **Node Editing** | ✅ P0 | MVP | Inline rename, drag-drop repositioning, delete | Core functionality |
| **Bidirectional Sync** | ✅ P0 | MVP | Text ↔ Diagram ↔ Assistant updates remain consistent | Core functionality |
| **AI Assistant Panel** | ✅ P0 | MVP | Displays Reasoning Loop suggestions (mocked for MVP) | **Differentiator** |
| **Export JSON & Markdown** | ✅ P0 | MVP | Allow downloading of the logic graph in multiple formats | Core functionality |
| **Error Handling & Loading States** | ✅ P0 | MVP | User feedback for async operations and errors | Core functionality |
| **Execution Preview** | 🔜 P1 | Post-MVP | Simulate branch outcomes with placeholder responses | Enhancement |
| **Real-time Collaboration** | 🔜 P2 | Future | Multiple users editing simultaneously | Enhancement |
| **Advanced AI Reasoning** | 🔜 P2 | Future | Real AI integration with causal inference | Enhancement |

---

## 🏗️ MVP Architecture

### Core Components
```
App
├── Header (Navigation + Export)
├── MainLayout (3-column grid)
│   ├── PromptPanel (Left)
│   │   ├── PromptInput (textarea)
│   │   ├── ActionButtons (Generate, Sample, Clear, Sync)
│   │   └── HintsCard
│   ├── CanvasArea (Center)
│   │   ├── ReactFlowProvider
│   │   ├── EmptyState (conditional)
│   │   ├── LoadingOverlay (conditional)
│   │   ├── ErrorBoundary
│   │   └── CustomNodes
│   │       ├── ConditionNode (blue, diamond)
│   │       ├── ActionNode (green, rectangular)
│   │       └── OutcomeNode (orange, rounded)
│   └── Sidebar (Right)
│       ├── JSONView (read-only)
│       └── AssistantPanel (suggestion cards)
└── Toaster (notifications)
```

### State Management
- **Zustand Store**: `nodes`, `edges`, `promptText`, `assistantSuggestions`
- **localStorage**: Versioned persistence with migration
- **Error Boundaries**: Graceful error handling

---

## 🎨 Design System

### Node Types & Colors
- **Condition Node**: `bg-blue-100 border-blue-500 text-blue-900` (diamond shape)
- **Action Node**: `bg-green-100 border-green-500 text-green-900` (rectangular)
- **Outcome Node**: `bg-orange-100 border-orange-500 text-orange-900` (rounded)

### Layout Specifications
- **3-column grid**: `grid-cols-3` with responsive breakpoints
- **Canvas**: Full height with React Flow controls
- **Sidebar**: Fixed width with scrollable content
- **Loading states**: Skeleton components from shadcn/ui

---

## 🔄 User Flows

### Primary Flow: Text → Logic → Edit → Export
1. **Input**: User types natural language prompt
2. **Generate**: AI parses text into logic nodes/edges
3. **Visualize**: React Flow renders interactive diagram
4. **Edit**: User modifies nodes, AI suggests improvements
5. **Sync**: Changes update text and JSON automatically
6. **Export**: Download as JSON or Markdown

### Secondary Flow: Sample → Explore → Refine
1. **Sample**: Load example logic from mock data
2. **Explore**: User interacts with pre-built logic
3. **Refine**: AI suggests improvements
4. **Customize**: User modifies for their use case

---

## 🧪 Mock Data Strategy

### Deterministic Responses
- **Sample prompts**: 3-5 realistic scenarios
- **Assistant suggestions**: 5-10 contextual responses
- **Error states**: Network failures, parsing errors
- **Loading states**: Simulated delays for UX

### Test Scenarios
1. **Onboarding Flow**: "If user skips onboarding, show tooltip, else proceed"
2. **Pricing Logic**: "If price increases, churn may rise, but revenue increases"
3. **Feature Rollout**: "If A/B test wins, implement globally, else iterate"

---

## 📈 Success Metrics

### User Experience
- **Time to first logic**: <2 minutes from empty canvas to working diagram
- **Suggestion acceptance**: >60% of AI suggestions applied
- **Export success**: 100% of exports work correctly
- **Error recovery**: <5 seconds to recover from any error

### Technical Performance
- **Canvas performance**: Smooth interaction with 20+ nodes
- **State persistence**: 100% data survival across page refreshes
- **Build time**: <30 seconds for production build
- **Bundle size**: <500KB gzipped

### Business Value
- **User engagement**: >5 minutes average session time
- **Return usage**: >70% of users return within 7 days
- **Demo quality**: Clear value proposition in 2-minute walkthrough

---

## 🚀 Post-MVP Roadmap

### Phase 2: Real AI Integration
- **OpenAI/Anthropic API**: Replace mock responses
- **Custom models**: Fine-tuned for logic analysis
- **Multi-modal**: Text + visual understanding

### Phase 3: Advanced Features
- **Execution simulation**: Run logic with sample data
- **Collaboration**: Real-time multi-user editing
- **Templates**: Pre-built logic patterns
- **Integrations**: Notion, Figma, Slack

### Phase 4: Enterprise
- **Team workspaces**: Shared logic libraries
- **Advanced analytics**: Usage insights and optimization
- **Custom branding**: White-label solutions
- **API access**: Programmatic logic generation

---

## 🎯 MVP Success Criteria

### Must Have (P0)
- [ ] User can input text and get visual logic
- [ ] User can edit nodes and see AI suggestions
- [ ] User can export logic in multiple formats
- [ ] All state persists across sessions
- [ ] App works on desktop browsers (Chrome, Firefox, Safari)

### Should Have (P1)
- [ ] Responsive design for tablet screens
- [ ] Keyboard shortcuts for power users
- [ ] Undo/redo functionality
- [ ] Error handling for all edge cases

### Could Have (P2)
- [ ] Mobile-friendly interface
- [ ] Advanced export formats (PDF, PNG)
- [ ] Custom node types
- [ ] Plugin architecture

---

## 🔧 Technical Constraints

### Performance
- **Bundle size**: <500KB gzipped
- **Load time**: <3 seconds on 3G
- **Canvas FPS**: >30fps with 20+ nodes
- **Memory usage**: <100MB for typical session

### Browser Support
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Accessibility
- **Keyboard navigation**: Full canvas control
- **Screen readers**: Proper ARIA labels
- **Color contrast**: WCAG AA compliance
- **Focus management**: Clear focus indicators
