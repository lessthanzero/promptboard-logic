# 🧠 FORMA / PromptBoard v0.3 — AI Logic Board MVP Sprint

### Vision
**AI Logic Board** — a reasoning canvas that transforms natural-language descriptions into interactive decision systems.  
Built for **product managers, strategists, and researchers** who want to **see cause–effect logic, explore “what-if” scenarios, and communicate reasoning visually.**

### Secret Sauce 💎 — The Reasoning Loop
A visible **AI Assistant Panel** that evolves with every edit.  
When a user changes a node or branch, the assistant suggests refinements (“Simplify this?”, “Merge these?”), creating a live dialogue between human and AI reasoning.  
It can later be hidden for focused mode — but in the MVP, it’s your *signature differentiator.*

---

## 🛠 Tech Stack

| Layer | Stack | Purpose |
|-------|--------|----------|
| **Frontend** | React + TypeScript + Vite + Tailwind + **shadcn/ui** (Radix UI under the hood) | Visual editor & polished, accessible UI |
| **Backend** | Node.js (Vite dev env) + optional FastAPI micro-service | AI parsing & feedback loop |
| **AI** | Mocked OpenAI/Anthropic responses + LangChain structure | Text ↔ Logic ↔ Simulation |
| **Data** | Local JSON / Supabase later | Sessions + edit history |
| **Collab** | Liveblocks (optional) | Real-time editing |
| **Deploy** | Vercel (frontend) + Railway (backend) | Fast demo deployment |

🧩 *Alternative UI suggestions*:  
If you ever need more prebuilt components or theming out of the box, **Mantine** or **Radix UI** can slot in easily — both compatible with the Tailwind setup.

---

## 🚀 5-Day Sprint Plan

### **Day 1 — Environment & Setup (Updated)**

**Goal:**  
Functional React + TypeScript + Vite + Tailwind + shadcn/ui app deployed on Vercel, with a clean repo structure and deploy configuration.  

---

**Tasks**  
- Create a new repo **`promptboard-logic`**.  
- Scaffold **Vite + React + TypeScript + Tailwind + shadcn/ui**.  
- Install base dependencies (`reactflow`, `axios`, `uuid`, `tailwindcss`, `@radix-ui/react-icons`) and initialize **shadcn/ui**.  
- Add `.env.example` and `.gitignore` for predictable local setup and CI hygiene.  
- Include a `vercel.json` for consistent build behaviour and backend proxy rewrites.  
- Configure `.env.local` with a mock `VITE_OPENAI_API_KEY`.  
- Push the repo to GitHub and connect to Vercel for a live preview deployment.  

---

**Example configuration details (to be included in the repo):**  

**.env.example**  
```
VITE_OPENAI_API_KEY=sk-...
VITE_USE_REAL_AI=false
```

**.gitignore**  
```
node_modules/
dist/
.vscode/
.DS_Store
.env*
!.env.example
*.log
components.json
```

**vercel.json** *(optional — Vercel auto-detects Vite projects)*  
```
{
  "env": { "VITE_USE_REAL_AI": "false" },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://your-railway-backend.app/api/$1" }
  ]
}
```
*Note: Vercel automatically detects Vite projects and uses the correct build command (`npm run build`) and output directory (`dist`). Only include this file if you need environment variables or API rewrites.*

---

**Deliverable:**  
A “Hello PromptBoard” live page deployed on Vercel, backed by a clean and documented repository that includes `.env.example`, `.gitignore`, and `vercel.json`.  

---

**Cursor Prompt:**  
Scaffold a **Vite + React + TypeScript** project using **Tailwind + shadcn/ui**.  
Include:  
- `pages/Canvas.tsx` rendering an empty **React Flow** canvas  
- **shadcn/ui** `Button` and `Card` components in the layout  
- `.env.local` using `VITE_OPENAI_API_KEY` (mocked)  
- Optional `vercel.json` for env vars and API rewrites (keep minimal)  
- Clean `.gitignore` and `.env.example`  
- **Zustand** for state management (install `zustand` package)  
- Initial store setup in `/lib/store.ts` with `nodes`, `edges`, and `promptText` state  
- Deploy-ready structure for Vercel

---

### **Day 2 — Personas, Scope & Mock Data Definition (Expanded)**
**Goal:**  
Define the primary user personas, the MVP feature scope, the structure of the "Reasoning Loop" feedback cycle, and create deterministic mock data for AI responses.

---

#### 🧑‍💼 Persona 1 — Product Manager (`/docs/personas/pm.md`)
**Name:** Maya Patel  
**Context:** Works in an early-stage SaaS startup. Uses Notion and Figma for planning but struggles to show dependencies and trade-offs clearly during roadmap discussions.  
**Goals:**  
- Turn natural-language hypotheses (“If we raise prices, churn may rise”) into logic graphs.  
- Communicate reasoning behind product decisions to non-design stakeholders.  
- Iterate quickly with AI suggestions to simplify or merge redundant logic branches.  
**Pain points:**  
- Whiteboards capture discussion but not reasoning.  
- Hard to track how one assumption affects multiple outcomes.  
- No lightweight tool between a mind-map and a full systems-modeling suite.  
**How PromptBoard helps:**  
Turns text prompts into causal-logic diagrams and maintains a bidirectional sync between the diagram, text, and AI commentary.

---

#### 🔬 Persona 2 — Researcher / Strategist (`/docs/personas/researcher.md`)
**Name:** Dr. Leo Chen  
**Context:** Works in policy and UX research; often analyzes qualitative insights to identify systemic causes.  
**Goals:**  
- Structure open-ended qualitative data into cause-effect trees.  
- Explore “what-if” changes and simulate their logical consequences.  
- Export diagrams and summaries for inclusion in research decks.  
**Pain points:**  
- Text-only analysis tools hide structure.  
- System-mapping software is too heavyweight for early exploration.  
**How PromptBoard helps:**  
Lets the researcher sketch logic quickly, keep the loop with AI for refinement, and export lightweight JSON for later use in visualization or data analysis tools.

---

#### 🧠 The Reasoning Loop (`/docs/ai_feedback.md`)
**Concept:**  
The *Reasoning Loop* is a visible AI Assistant Panel that continuously reacts to user edits on the logic board.  
- **Observe:** Watches for node changes, additions, or deletions.  
- **Interpret:** Runs a lightweight reasoning model (mocked in MVP) to detect simplifications or contradictions.  
- **Respond:** Suggests one-click actions such as *“Simplify this?”*, *“Merge similar branches”*, or *“Add missing outcome?”*.  
- **Sync:** Updates text and JSON representations to keep all views aligned.  

In the MVP, all responses are mocked via static JSON templates to simulate intelligent behavior, preparing for real API integration in Day 5.

---

#### 🧩 MVP Scope (`/docs/mvp_scope.md`)
| Feature | Priority | Description |
|----------|-----------|-------------|
| **Text Prompt → Logic JSON** | ✅ | Parse natural language into structured nodes (`Condition`, `Action`, `Outcome`). |
| **React Flow Visualisation** | ✅ | Render nodes and edges with zoom, pan, and color-coded types. |
| **Node Editing** | ✅ | Inline rename, drag-drop repositioning. |
| **Bidirectional Sync** | ✅ | Text ↔ Diagram ↔ Assistant updates remain consistent. |
| **AI Assistant Panel** | ✅ | Displays Reasoning Loop suggestions (mocked for MVP). |
| **Export JSON & Markdown** | ✅ | Allow downloading of the logic graph in multiple formats. |
| **Error Handling & Loading States** | ✅ | User feedback for async operations and errors. |
| **Execution Preview** | 🔜 | Simulate branch outcomes with placeholder responses (post-MVP). |

---

#### 🧪 Mock Data Structure (`/mocks/ai-responses.json`)
**Purpose:**  
Define deterministic mock AI responses for demo and testing purposes. This file will be created in Day 2 and used throughout Days 3-5.

**Structure:**
```json
{
  "samplePrompts": [
    {
      "id": "onboarding-skip",
      "prompt": "If user skips onboarding, show tooltip reminder, else proceed to dashboard.",
      "nodes": [
        { "id": "c1", "type": "condition", "label": "User skips onboarding?" },
        { "id": "a1", "type": "action", "label": "Show tooltip reminder" },
        { "id": "a2", "type": "action", "label": "Proceed to dashboard" },
        { "id": "o1", "type": "outcome", "label": "Reduced confusion" },
        { "id": "o2", "type": "outcome", "label": "Normal flow" }
      ],
      "edges": [
        { "source": "c1", "target": "a1", "label": "yes" },
        { "source": "c1", "target": "a2", "label": "no" },
        { "source": "a1", "target": "o1" },
        { "source": "a2", "target": "o2" }
      ]
    }
  ],
  "assistantSuggestions": [
    { "id": "simplify", "text": "Simplify this branch?", "action": "merge" },
    { "id": "add-outcome", "text": "Add missing outcome?", "action": "create" },
    { "id": "rename", "text": "Rename improves clarity?", "action": "rename" }
  ]
}
```

**Version Management for localStorage:**
```typescript
// In /lib/store.ts
const STORAGE_VERSION = "v2";
const STORAGE_KEY = `promptboard_state_${STORAGE_VERSION}`;

// Include migration logic for older versions
function loadStateWithMigration() {
  const v2 = localStorage.getItem('promptboard_state_v2');
  if (v2) return JSON.parse(v2);
  
  const v1 = localStorage.getItem('promptboard_state_v1');
  if (v1) {
    const oldState = JSON.parse(v1);
    // Migrate v1 → v2 structure
    return migrateV1ToV2(oldState);
  }
  
  return null; // Fresh state
}
```

---

**Deliverable:**  
By the end of Day 2, `/docs/personas/`, `/docs/ai_feedback.md`, `/docs/mvp_scope.md`, and `/mocks/ai-responses.json` are committed, clearly outlining who PromptBoard is for, how it behaves, which core features are included in the MVP, and providing testable mock data.

---

### **Day 3 — Design, Wireframes & Component Architecture**
**Goal:**  
Define visual layouts, component hierarchy, and prepare design tokens for implementation.

---

**Tasks**
1. Create ASCII wireframes for three key states: Empty, Generated, Edit Mode.
2. Document component hierarchy in `/docs/component-architecture.md`.
3. Define Tailwind color tokens and spacing for node types.
4. Specify error states and loading indicators.

---

**Wireframes** (`/docs/wireframes.md`)
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││          · · ·  EMPTY  · · ·    ││                                            │
│ │ Textarea (placeholder):               │ ││                                  ││ JSON (read-only in empty state):          │
│ │  “If user skips onboarding, then…     │ ││    (Soft dashed bg grid)         ││  { }                                       │
│ │   else prompt tips…”                  │ ││                                  ││ ─────────────────────────────────────────  │
│ └────────────────────────────────────────┘ ││  Empty State Helper:             ││ Assistant (empty hints):                   │
│ [Generate Logic]  [Sample] [Clear]         ││  (Center)                        ││  • Try pasting a brief scenario            │
│                                            ││  ┌───────────────────────────┐   ││  • Or click “Sample”                      │
│ Card: "Hints"                              ││  │  No nodes yet.             │   ││                                            │
│ - Keep it short (2–3 sentences)            ││  │  Paste text on the left.   │   ││ [Docs] [Shortcuts]                        │
│ - Use “if… then…” statements               ││  └───────────────────────────┘   ││                                            │
└────────────────────────────────────────────┘└──────────────────────────────────┘└────────────────────────────────────────────┘  

**Component Architecture** (`/docs/component-architecture.md`)
```
App
├── Header (shadcn/ui components)
├── MainLayout (3-column grid)
│   ├── PromptPanel
│   │   ├── PromptInput (textarea + controls)
│   │   ├── ActionButtons (Generate, Sample, Clear)
│   │   └── HintsCard
│   ├── CanvasArea
│   │   ├── ReactFlowProvider
│   │   ├── EmptyState (conditional)
│   │   ├── LoadingOverlay (conditional)
│   │   ├── ErrorBoundary
│   │   └── CustomNodes
│   │       ├── ConditionNode (blue, diamond-ish)
│   │       ├── ActionNode (green, rectangular)
│   │       └── OutcomeNode (orange, rounded)
│   └── Sidebar (shadcn/ui Tabs)
│       ├── JSONView (read-only, monospace)
│       └── AssistantPanel (suggestion cards)
└── Toaster (error/success notifications)
```

**Design Tokens:**
- Condition Node: `bg-blue-100 border-blue-500 text-blue-900`
- Action Node: `bg-green-100 border-green-500 text-green-900`
- Outcome Node: `bg-orange-100 border-orange-500 text-orange-900`
- Loading state: Skeleton components from shadcn/ui
- Error state: Alert component with destructive variant

---

**Deliverable:**  
Complete wireframes, component hierarchy diagram, and design token reference for consistent implementation in Days 4-5.

---

### **Day 4 — React Flow Canvas & Core Nodes (Focused)**
**Goal:**  
Build the interactive canvas with React Flow, implement three custom node types with inline editing, and establish Zustand state management with localStorage persistence.

**Note:** This day focuses exclusively on the canvas and nodes. The assistant panel will be added in Day 5 to avoid scope creep.

---

**Tasks**

1. **Zustand Store Setup** (`/lib/store.ts`)
   - Create store with `nodes`, `edges`, `promptText` state.
   - Implement `addNode`, `updateNode`, `deleteNode`, `addEdge`, `deleteEdge` actions.
   - Add `loadState` and `saveState` methods with version migration logic (see Day 2 mock structure).
   - Persist to localStorage on every state change (debounced).

2. **Node System Implementation**
   - Create three custom node components in `/components/nodes/`:  
     - `ConditionNode.tsx` (blue, diamond-shaped handle positioning).  
     - `ActionNode.tsx` (green, rectangular).
     - `OutcomeNode.tsx` (orange, rounded corners).  
   - Each node supports:
     - Inline renaming (double-click to edit, blur to save).
     - Delete button (× icon in corner).
     - Type badge display.
   - Register custom nodes with React Flow's `nodeTypes` prop.

3. **Canvas Implementation**
   - Set up 3-column layout using Tailwind grid in `MainLayout.tsx`.
   - Implement `CanvasArea.tsx`:
     - Wrap in `<ReactFlowProvider>`.
     - Connect to Zustand store for `nodes` and `edges`.
     - Enable controls (zoom, pan), minimap (optional), and background grid.
     - Add `EmptyState` component (conditionally rendered when `nodes.length === 0`).
     - Include React Error Boundary for graceful error handling.
   - Style canvas with dashed background grid.

4. **Left Panel: Prompt Input** (`PromptPanel.tsx`)
   - Textarea for prompt input (connects to `promptText` in Zustand).
   - Three buttons:
     - `[Generate Logic]` — triggers AI parsing (will be wired in Day 5, for now just shows loading toast).
     - `[Sample]` — loads sample prompt from `/mocks/ai-responses.json`.
     - `[Clear]` — resets canvas and prompt.
   - Hints card with usage tips.

5. **Right Panel: JSON View Only** (`Sidebar.tsx`)
   - Single tab for now: **JSON View**.
   - Display current `nodes` and `edges` as formatted JSON (read-only).
   - Use `font-mono` styling and syntax highlighting (optional: `react-json-view` or simple `<pre>`).
   - Auto-updates on state change.

6. **Loading & Error States**
   - Add `LoadingOverlay` component (spinner + "Generating logic..." text).
   - Use shadcn/ui `Skeleton` components for loading placeholders.
   - Implement `Toaster` for error/success notifications (shadcn/ui toast).

7. **Node Interaction**
   - Hover highlights (border glow effect).
   - Selection outlines (React Flow's default selection styling + Tailwind enhancement).
   - Drag-and-drop repositioning (React Flow built-in).
   - Edge creation via handle clicks (React Flow built-in).

---

**Deliverable:**  
Functional React Flow canvas with three custom node types, Zustand state management, localStorage persistence with version migration, JSON view sidebar, and comprehensive error handling.

---

**Cursor Prompt**
```bash
# Cursor: Build React Flow canvas with custom nodes and Zustand state
1. Set up Zustand store in /lib/store.ts:
   - State: nodes, edges, promptText
   - Actions: addNode, updateNode, deleteNode, addEdge, deleteEdge
   - localStorage persistence with version migration (v2)
2. Create 3 custom node components in /components/nodes/:
   - ConditionNode.tsx (blue, diamond handles)
   - ActionNode.tsx (green, rectangular)
   - OutcomeNode.tsx (orange, rounded)
   - Support inline editing (double-click) and delete buttons
3. Build 3-column layout in MainLayout.tsx:
   - Left: PromptPanel (textarea + Generate/Sample/Clear buttons)
   - Center: CanvasArea (React Flow with EmptyState, ErrorBoundary)
   - Right: Sidebar (JSON View tab only for now)
4. Connect React Flow to Zustand store
5. Add LoadingOverlay and Toaster (shadcn/ui)
6. Style nodes with Tailwind: blue-100/500, green-100/500, orange-100/500
7. Load sample from /mocks/ai-responses.json on [Sample] click

---

### **Day 5 — AI Integration, Assistant Panel, Bidirectional Sync & Export**
**Goal:**  
Integrate mocked AI responses, implement the Assistant Panel with reasoning loop suggestions, enable bidirectional text ↔ graph synchronization, add export functionality, and prepare for deployment.

---

**Tasks**

1. **AI Integration Layer** (`/lib/ai.ts`)
   - Implement `getLogicFromPrompt(promptText: string)` function:
     - **Mock mode (default):** Load response from `/mocks/ai-responses.json` based on keyword matching.
     - **Real mode:** Stub for OpenAI/Anthropic API call (controlled by `VITE_USE_REAL_AI` env var).
   - Implement `summarizeGraph(nodes, edges)` function:
     - Use **topological sort** to traverse the graph in logical order.
     - Generate plain-language summary following "if...then...leading to..." pattern.
     - Handle cycles gracefully (detect and add "[cycle detected]" note).
   - Define TypeScript interfaces:
     ```ts
     interface LogicNode {
       id: string;
       type: 'condition' | 'action' | 'outcome';
       label: string;
       position?: { x: number; y: number };
     }
     interface LogicEdge {
       source: string;
       target: string;
       label?: string;
     }
     interface AIResponse {
       nodes: LogicNode[];
       edges: LogicEdge[];
       suggestions?: string[];
     }
     ```

2. **Text → Graph Flow**
   - Wire `[Generate Logic]` button to `getLogicFromPrompt()`.
   - Show loading overlay during "parsing" (add 500ms simulated delay for UX).
   - Convert AI response to React Flow format with automatic layout (dagre or manual positioning).
   - Update Zustand store with new nodes/edges.
   - Display success toast: "Generated X nodes, Y edges".
   - Handle errors gracefully with error toast and fallback state.

3. **Graph → Text Sync**
   - Add `[Sync to Text]` button in PromptPanel.
   - Call `summarizeGraph()` with current Zustand state.
   - Update `promptText` in store with generated summary.
   - Show info toast: "Summary updated from graph".

4. **Assistant Panel Implementation** (`AssistantPanel.tsx`)
   - Add second tab to Sidebar: **"AI Assistant"**.
   - Implement suggestion card system:
     - Show 2-3 contextual suggestions from `/mocks/ai-responses.json`.
     - Each suggestion is a shadcn/ui Card with:
       - Icon (lightbulb, merge, plus, etc.)
       - Text description
       - Two buttons: `[Apply]` (mock action), `[Dismiss]` (remove card)
   - Trigger suggestion refresh on:
     - Node rename (debounced 1s after edit)
     - Node deletion
     - New nodes added
   - Mock suggestions:
     - "Simplify this branch?" → merge action
     - "Add missing outcome?" → create node
     - "Rename improves clarity?" → acknowledge only

5. **Export Functionality**
   - Add `[Download JSON]` button to header or sidebar.
   - Export current state as `.json` file: `{nodes, edges, promptText, timestamp}`.
   - Add `[Download Markdown]` button (bonus):
     - Use `summarizeGraph()` output.
     - Format as Markdown with node list and edge connections.
     - Save as `.md` file.

6. **Error Boundaries & Edge Cases**
   - Wrap entire app in React Error Boundary.
   - Handle localStorage quota exceeded (catch exception, show alert).
   - Validate node connections (prevent orphan nodes warning).
   - Add "Reset All" option in case of corrupted state.

7. **Polish & Final Testing**
   - Test full flow: Empty → Sample → Generate → Edit → Sync → Export.
   - Verify localStorage persistence across page refreshes.
   - Check responsive layout (canvas should fill space properly).
   - Ensure all buttons have hover states and disabled states where appropriate.

8. **Deployment**
   - Push to GitHub main branch.
   - Vercel auto-deploys via GitHub integration.
   - Test live deployment URL.
   - Record 2-minute Loom demo covering:
     1. Empty state and sample load
     2. Text → Logic generation
     3. Node editing and inline rename
     4. Assistant panel suggestions
     5. Graph → Text sync
     6. JSON export
   - Add demo link to `/docs/demo.md`.

---

**Deliverable:**  
Fully functional MVP with mocked AI, bidirectional sync, assistant panel with reasoning loop suggestions, JSON/Markdown export, comprehensive error handling, and deployed Vercel demo with Loom video.

---

**Cursor Prompt**
```bash
# Cursor: Complete AI integration, assistant panel, sync, and export
1. Create /lib/ai.ts:
   - getLogicFromPrompt(text) → loads from /mocks/ai-responses.json (mock mode)
   - summarizeGraph(nodes, edges) → topological sort + plain-language output
   - Stub for real API with VITE_USE_REAL_AI toggle
   - TypeScript interfaces: LogicNode, LogicEdge, AIResponse
2. Wire [Generate Logic] button:
   - Call getLogicFromPrompt, show loading overlay (500ms delay)
   - Convert to React Flow format with auto-layout
   - Update Zustand store, show success toast
3. Add [Sync to Text] button:
   - Call summarizeGraph, update promptText in store
4. Build AssistantPanel.tsx:
   - Second tab in Sidebar
   - Show 2-3 suggestion cards from mocks (icon, text, Apply/Dismiss buttons)
   - Refresh on node edits (debounced 1s)
5. Add export buttons:
   - [Download JSON] → export {nodes, edges, promptText, timestamp}
   - [Download Markdown] → use summarizeGraph output
6. Add Error Boundary wrapper
7. Test full flow and deploy to Vercel
8. Record 2-min Loom demo

---

## ✅ Deliverables after 5 Days
- **Interactive Logic Editor**: React Flow canvas with 3 custom node types (Condition, Action, Outcome)
- **Reasoning Loop Assistant Panel**: Contextual suggestions that respond to user edits
- **Bidirectional Sync**: Text ↔ Graph conversion with topological sort for graph summarization
- **State Management**: Zustand store with versioned localStorage persistence and migration logic
- **Export Functionality**: JSON and Markdown download options
- **Error Handling**: Comprehensive error boundaries, loading states, and user feedback (toasts)
- **Deployed Demo**: Live Vercel deployment + 2-minute Loom walkthrough video
- **Documentation Set**:
  - `/docs/personas/pm.md` and `/docs/personas/researcher.md`
  - `/docs/mvp_scope.md` with feature priority matrix
  - `/docs/ai_feedback.md` explaining the Reasoning Loop concept
  - `/docs/wireframes.md` with ASCII layouts and component architecture
  - `/docs/component-architecture.md` with detailed component hierarchy
  - `/mocks/ai-responses.json` with deterministic test data
  - `/docs/demo.md` with Loom video link

---

## 🔄 Key Improvements from Original Plan

1. **Fixed Vercel Configuration**: Removed incorrect build config; Vercel now auto-detects Vite projects
2. **State Management Clarity**: Committed to Zustand from Day 1 with localStorage versioning
3. **Mock Data Upfront**: Created `/mocks/ai-responses.json` in Day 2 for consistent testing
4. **Graph Algorithm Specified**: Topological sort for `summarizeGraph()` to handle complex logic flows
5. **Realistic Day 4 Scope**: Moved assistant panel to Day 5 to focus on canvas core functionality
6. **Error Handling Added**: Comprehensive error boundaries, loading states, and edge case handling
7. **Export Formats**: Added Markdown export option alongside JSON for researcher persona
8. **Component Architecture**: Added detailed component hierarchy diagram in Day 3

---

## 🎯 Success Metrics for MVP

- **Core Functionality**: User can go from text prompt → visual graph → edited logic → exported file in < 2 minutes
- **Differentiator**: Assistant panel provides at least 2-3 contextual suggestions per edit action
- **Persistence**: State survives page refresh with no data loss
- **Performance**: Canvas handles 10+ nodes smoothly with drag, zoom, and pan
- **Demo Quality**: Loom video clearly demonstrates unique value proposition (Reasoning Loop)
