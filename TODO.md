# PromptBoard Development TODO

## 🎯 Current Sprint: Day 1 Complete ✅

### Day 1 - Environment & Setup ✅
- [x] Create Vite + React + TypeScript + Tailwind project
- [x] Install base dependencies (reactflow, axios, uuid, tailwindcss, @radix-ui/react-icons, zustand)
- [x] Add .env.example, .gitignore, and minimal vercel.json
- [x] Create initial Zustand store setup in /lib/store.ts
- [x] Create pages/Canvas.tsx with empty React Flow canvas
- [x] Deploy to Vercel and test live preview

### Day 2 - Personas, Scope & Mock Data Definition ✅
- [x] Create /docs/personas/pm.md (Maya Patel - Product Manager)
- [x] Create /docs/personas/researcher.md (Dr. Leo Chen - Researcher/Strategist)
- [x] Create /docs/ai_feedback.md (Reasoning Loop concept)
- [x] Create /docs/mvp_scope.md (Feature priority matrix)
- [x] Create /mocks/ai-responses.json (Deterministic mock data)
- [x] Document localStorage version migration strategy

### Day 3 - Design, Wireframes & Component Architecture ✅
- [x] Create /docs/wireframes.md (Real data wireframes for 5 states)
- [x] Create /docs/component-architecture.md (Persona-aware component hierarchy)
- [x] Create /docs/design-tokens.md (Comprehensive style guide)
- [x] Create /docs/error-states.md (Specific error scenarios)
- [x] Add non-PM/Researcher mock scenario (job salary decision)
- [x] Design executable wireframes concept for future implementation

### Day 4 - React Flow Canvas & Core Nodes
- [ ] Implement Zustand store with localStorage persistence
- [ ] Create 3 custom node components (Condition, Action, Outcome)
- [ ] Build 3-column layout (PromptPanel, CanvasArea, Sidebar)
- [ ] Add JSON View tab to sidebar
- [ ] Implement loading states and error boundaries
- [ ] Connect React Flow to Zustand store

### Day 5 - AI Integration, Assistant Panel, Sync & Export ✅
- [x] Create /lib/ai.ts with mock + real API structure
- [x] Implement getLogicFromPrompt() and summarizeGraph()
- [x] Wire [Generate Logic] button with loading states
- [x] Add [Sync to Text] button
- [x] Build AssistantPanel.tsx with suggestion cards
- [x] Add export functionality (JSON + Markdown)
- [x] Test full flow and deploy
- [x] Record 2-minute Loom demo

## 🎨 UI/UX Improvements - Post-MVP

### Phase 1: Immediate Polish (Week 1)
- [x] **Dark Mode Toggle**
  - [x] Theme context provider
  - [x] CSS variables for light/dark themes
  - [x] Toggle button in header
  - [x] Persist user preference in localStorage
- [x] **Enhanced Button States**
  - [x] Hover animations (scale 1.05x, shadow elevation)
  - [ ] Loading spinners with progress indicators
  - [x] Success/error toasts with auto-dismiss
  - [x] Button press animations (scale down 0.95x)
- [x] **Improved Error Handling**
  - [x] Toast notification system
  - [ ] Error boundary improvements
  - [x] User-friendly error messages
  - [ ] Recovery suggestions
- [x] **Keyboard Shortcuts**
  - [x] Cmd/Ctrl + K for command palette
  - [ ] Cmd/Ctrl + Z/Y for undo/redo
  - [x] Cmd/Ctrl + S for save
  - [x] Escape to close modals
- [x] **UI Layout & Typography Updates**
  - [x] Replace fonts with Inter (UI) and JetBrains Mono (code)
  - [x] Remove gray outlines from all buttons
  - [x] Add 8px gaps between buttons
  - [x] Fix panel widths (1/4 each side, 2/4 center)
  - [x] Fix vertical overflow for panels
  - [x] Move hints below text area
  - [x] Add copy icon to JSON view
  - [x] Ensure 44px minimum touch targets
  - [x] Remove unused small gray buttons
- [ ] **Resizable Panels**
  - [ ] Drag handles for panel resizing
  - [ ] Minimum/maximum width constraints
  - [ ] Persist panel sizes in localStorage
  - [ ] Smooth resize animations

### Phase 2: Advanced Interactions (Week 2-3)
- [ ] **Interactive Tutorial**
  - [ ] Step-by-step onboarding flow
  - [ ] Highlight UI elements with spotlight
  - [ ] Progress indicator for tutorial steps
  - [ ] Skip option for experienced users
- [ ] **Advanced Node Interactions**
  - [ ] Drag preview with ghost effect
  - [ ] Selection highlighting with animated border
  - [ ] Hover effects (subtle glow, scale up)
  - [ ] Connection animations (smooth line drawing)
  - [ ] Delete confirmation with slide-out animation
- [ ] **Mobile Responsiveness**
  - [ ] Touch-friendly targets (44px minimum)
  - [ ] Swipe gestures for panel switching
  - [ ] Pinch-to-zoom for canvas navigation
  - [ ] Long-press menus for context actions
- [ ] **Performance Optimizations**
  - [ ] Lazy loading for large graphs
  - [ ] Virtual scrolling for long lists
  - [ ] Debounced search to prevent excessive API calls
  - [ ] Image optimization for icons and graphics
- [ ] **Accessibility Improvements**
  - [ ] Screen reader support with ARIA labels
  - [ ] High contrast mode for visual impairments
  - [ ] Keyboard navigation for all interactive elements
  - [ ] Focus management with visible focus indicators
  - [ ] Color-blind friendly color schemes

### Phase 3: Advanced Features (Month 2)
- [ ] **Collaboration Features**
  - [ ] Live cursors showing other users
  - [ ] Change indicators with user attribution
  - [ ] Comment system on nodes and edges
  - [ ] Version history with diff visualization
  - [ ] Conflict resolution for simultaneous edits
- [ ] **Advanced AI Integration**
  - [ ] Suggestion confidence with visual indicators
  - [ ] AI explanation mode (show reasoning behind suggestions)
  - [ ] Suggestion history with accept/reject tracking
  - [ ] Smart auto-complete for node labels
  - [ ] Context-aware suggestions based on graph structure
- [ ] **Template Library**
  - [ ] Pre-built logic patterns
  - [ ] Industry-specific templates
  - [ ] User-created template sharing
  - [ ] Template categorization and search
- [ ] **Advanced Export Options**
  - [ ] Share links with permission levels
  - [ ] Embed codes for documentation
  - [ ] Print optimization with proper page breaks
  - [ ] Export templates for different use cases
  - [ ] Integration APIs for external tools
- [ ] **Analytics and Monitoring**
  - [ ] Usage pattern tracking
  - [ ] Performance metrics dashboard
  - [ ] Error tracking with detailed logging
  - [ ] User behavior analytics

### Phase 4: Enterprise Features (Month 3+)
- [ ] **Plugin System**
  - [ ] Custom node types
  - [ ] Third-party integrations
  - [ ] User-defined workflows
  - [ ] API for custom extensions
- [ ] **Advanced Customization**
  - [ ] Theme customization with CSS variables
  - [ ] Custom color schemes
  - [ ] Branding options for white-label
  - [ ] Layout customization
- [ ] **Enterprise Features**
  - [ ] Team management and permissions
  - [ ] SSO integration
  - [ ] Audit logging
  - [ ] Advanced security features
- [ ] **Global Distribution**
  - [ ] CDN integration for global distribution
  - [ ] Multi-language support
  - [ ] Regional compliance features
  - [ ] Performance optimization for global users

## 🔄 Development Workflow
- **develop branch**: Local testing and feature development
- **main branch**: Stable, deployable code
- **Feature branches**: Individual features (if needed)

## 📝 Notes
- All changes tested locally on develop branch first
- Commit to main only after local testing passes
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
