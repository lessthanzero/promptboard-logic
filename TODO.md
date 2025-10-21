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

### Day 3 - Design, Wireframes & Component Architecture
- [ ] Create /docs/wireframes.md (ASCII layouts for 3 states)
- [ ] Create /docs/component-architecture.md (Component hierarchy)
- [ ] Define Tailwind design tokens for node types
- [ ] Specify error states and loading indicators

### Day 4 - React Flow Canvas & Core Nodes
- [ ] Implement Zustand store with localStorage persistence
- [ ] Create 3 custom node components (Condition, Action, Outcome)
- [ ] Build 3-column layout (PromptPanel, CanvasArea, Sidebar)
- [ ] Add JSON View tab to sidebar
- [ ] Implement loading states and error boundaries
- [ ] Connect React Flow to Zustand store

### Day 5 - AI Integration, Assistant Panel, Sync & Export
- [ ] Create /lib/ai.ts with mock + real API structure
- [ ] Implement getLogicFromPrompt() and summarizeGraph()
- [ ] Wire [Generate Logic] button with loading states
- [ ] Add [Sync to Text] button
- [ ] Build AssistantPanel.tsx with suggestion cards
- [ ] Add export functionality (JSON + Markdown)
- [ ] Test full flow and deploy
- [ ] Record 2-minute Loom demo

## 🔄 Development Workflow
- **develop branch**: Local testing and feature development
- **main branch**: Stable, deployable code
- **Feature branches**: Individual features (if needed)

## 📝 Notes
- All changes tested locally on develop branch first
- Commit to main only after local testing passes
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
