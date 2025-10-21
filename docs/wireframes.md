# Wireframes - Real Data States

## 🎯 Design Philosophy
Wireframes use **actual mock data** from Day 2 to ensure realistic implementation. All states are designed for **tablet-first** (iPad Air, Google Pixel) with desktop enhancement.

---

## 📱 **State 1: Empty State**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││          · · ·  EMPTY  · · ·    ││                                            │
│ │ Textarea (placeholder):               │ ││                                  ││ JSON (read-only in empty state):          │
│ │  "If user skips onboarding, then…     │ ││    (Soft dashed bg grid)         ││  { }                                       │
│ │   else prompt tips…"                   │ ││                                  ││ ─────────────────────────────────────────  │
│ └────────────────────────────────────────┘ ││  Empty State Helper:             ││ Assistant (empty hints):                   │
│ [Generate Logic]  [Sample] [Clear]         ││  (Center)                        ││  • Try pasting a brief scenario            │
│                                            ││  ┌───────────────────────────┐   ││  • Or click "Sample"                      │
│ Card: "Hints"                              ││  │  No nodes yet.             │   ││                                            │
│ - Keep it short (2–3 sentences)            ││  │  Paste text on the left.   │   ││ [Docs] [Shortcuts]                        │
│ - Use "if… then…" statements               ││  └───────────────────────────┘   ││                                            │
│                                            ││                                 ││ Mode: [PM ▼] [Researcher] [Custom...]    │
└────────────────────────────────────────────┘└──────────────────────────────────┘└────────────────────────────────────────────┘
```

**Key Features:**
- **Mode Selector**: Editable dropdown (PM, Researcher, Custom...)
- **Tablet-optimized**: Larger touch targets, readable text
- **Empty State**: Clear call-to-action with sample prompt

---

## 📱 **State 2: Generated State (Onboarding Sample)**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌─────────┐                   ││                                            │
│ │ Textarea:                               │ ││  │    C1    │                   ││ JSON View:                                 │
│ │ "If user skips onboarding, show tooltip │ ││  │  User    │                   ││ {                                          │
│ │  reminder, else proceed to dashboard"   │ ││  │ skips?  │                   ││   "nodes": [                               │
│ └────────────────────────────────────────┘ ││  └────┬────┘                   ││     { "id": "c1", "type": "condition"... }   │
│ [Generate Logic]  [Sample] [Clear]         ││       │                        ││   ],                                        │
│                                            ││   ┌───┴───┐  ┌─────────────┐   ││   "edges": [                               │
│ Card: "Hints"                              ││   │   A1  │  │     A2      │   ││     { "source": "c1", "target": "a1"... }  │
│ - Keep it short (2–3 sentences)            ││   │ Show  │  │  Proceed    │   ││   ]                                        │
│ - Use "if… then…" statements               ││   │tooltip │  │ to dashboard│   ││ }                                          │
│                                            ││   └───┬───┘  └─────┬───────┘   ││ ─────────────────────────────────────────  │
│ Mode: [PM ▼] [Researcher] [Custom...]      ││       │            │          ││ Assistant Suggestions:                     │
└────────────────────────────────────────────┘│   ┌───┴───┐  ┌────┴──────┐   ││                                            │
                                             ││   │   O1  │  │     O2     │   ││ 💡 Simplify this branch?                   │
                                             ││   │Reduced│  │ Normal    │   ││    [Apply] [Dismiss]                        │
                                             ││   │confusion│  │  flow     │   ││                                            │
                                             ││   └───────┘  └───────────┘   ││ ➕ Add missing outcome?                     │
                                             ││                             ││    [Apply] [Dismiss]                        │
                                             │└─────────────────────────────┘└────────────────────────────────────────────┘
```

**Key Features:**
- **Real Data**: Uses onboarding-skip sample from mocks
- **Interactive Nodes**: Color-coded (blue=condition, green=action, orange=outcome)
- **Assistant Panel**: Shows contextual suggestions
- **JSON Sync**: Real-time updates as user edits

---

## 📱 **State 3: Edit Mode (Job Salary Decision)**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌─────────┐                   ││                                            │
│ │ Textarea:                               │ ││  │    C1    │                   ││ JSON View:                                 │
│ │ "If I find a new job with salary >$80k, │ ││  │  Salary  │                   ││ {                                          │
│ │  I stay in current city, else move"    │ ││  │  >$80k?  │                   ││   "nodes": [                               │
│ └────────────────────────────────────────┘ ││  └────┬────┘                   ││     { "id": "c1", "type": "condition"... }   │
│ [Generate Logic]  [Sample] [Clear]         ││       │                        ││   ],                                        │
│                                            ││   ┌───┴───┐  ┌─────────────┐   ││   "edges": [                               │
│ Card: "Hints"                              ││   │   A1  │  │     A2      │   ││     { "source": "c1", "target": "a1"... }  │
│ - Keep it short (2–3 sentences)            ││   │ Stay  │  │    Move     │   ││   ]                                        │
│ - Use "if… then…" statements               ││   │ here  │  │   to new    │   ││ }                                          │
│                                            ││   └───┬───┘  │   city      │   ││ ─────────────────────────────────────────  │
│ Mode: [Custom ▼] [PM] [Researcher]        ││       │      └─────┬───────┘   ││ Assistant Suggestions:                     │
│                                            ││   ┌───┴───┐  ┌────┴──────┐   ││                                            │
│ [Sync to Text] [Download JSON] [PDF]       ││   │   O1  │  │     O2     │   ││ 💡 Add salary range slider?                │
└────────────────────────────────────────────┘│   │Stable │  │  New       │   ││    [Apply] [Dismiss]                        │
                                             │   │ life  │  │  start     │   ││                                            │
                                             │   └───────┘  └───────────┘   ││ ➕ Consider cost of living?                  │
                                             ││                             ││    [Apply] [Dismiss]                        │
                                             │└─────────────────────────────┘└────────────────────────────────────────────┘
```

**Key Features:**
- **Custom Mode**: User-defined persona for personal decisions
- **Interactive Elements**: Salary slider, location inputs
- **Export Options**: JSON, Markdown, PDF
- **Personal Context**: Life decision logic, not business

---

## 📱 **State 4: Loading State**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌───────────────────────────┐   ││                                            │
│ │ Textarea: "If user skips onboarding..." │ ││  │  🔄 Analyzing your logic... │   ││ JSON (loading):                           │
│ └────────────────────────────────────────┘ ││  │                           │   ││  { "loading": true }                      │
│ [Generate Logic]  [Sample] [Clear]         ││  │  Converting text to visual │   ││ ─────────────────────────────────────────  │
│                                            ││  │  diagram...                │   ││ Assistant (loading):                      │
│ Card: "Hints"                              ││  │                           │   ││  • Preparing suggestions...               │
│ - Keep it short (2–3 sentences)            ││  └───────────────────────────┘   ││  • Analyzing logic structure...           │
│ - Use "if… then…" statements               ││                                 ││                                            │
│                                            ││                                 ││ Mode: [PM ▼] [Researcher] [Custom...]    │
└────────────────────────────────────────────┘└──────────────────────────────────┘└────────────────────────────────────────────┘
```

**Key Features:**
- **Progress Indicators**: Clear loading states
- **Contextual Messages**: What's happening and why
- **Non-blocking**: User can still access other panels

---

## 📱 **State 5: Error State**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌───────────────────────────┐   ││                                            │
│ │ Textarea: "Complex nested condition..." │ ││  │  ❌ Could not parse prompt │   ││ JSON (error):                              │
│ └────────────────────────────────────────┘ ││  │                           │   ││  { "error": "parsing_failed" }             │
│ [Generate Logic]  [Sample] [Clear]         ││  │  Please try rephrasing in  │   ││ ─────────────────────────────────────────  │
│                                            ││  │  simpler terms            │   ││ Assistant (error):                         │
│ Card: "Hints"                              ││  │                           │   ││  • Use 'if...then...' statements          │
│ - Keep it short (2–3 sentences)            ││  │  Suggestions:              │   ││  • Keep it to 2-3 sentences               │
│ - Use "if… then…" statements               ││  │  • Use 'if...then...'     │   ││  • Avoid complex nested conditions        │
│                                            ││  │  • Keep it to 2-3 sentences│   ││                                            │
│ Mode: [PM ▼] [Researcher] [Custom...]      ││  │  • Avoid complex nesting  │   ││ [Try Again] [Use Sample] [Get Help]       │
└────────────────────────────────────────────┘│  └───────────────────────────┘   │└────────────────────────────────────────────┘
```

**Key Features:**
- **Clear Error Messages**: What went wrong and why
- **Actionable Suggestions**: How to fix the problem
- **Recovery Options**: Try again, use sample, get help
- **Non-destructive**: User's work is preserved

---

## 🎨 **Design Tokens**

### **Node Colors**
- **Condition**: `bg-blue-100 border-blue-500 text-blue-900`
- **Action**: `bg-green-100 border-green-500 text-green-900`
- **Outcome**: `bg-orange-100 border-orange-500 text-orange-900`

### **Mode Themes**
- **PM**: Business-focused grays and blues
- **Researcher**: Academic-focused slate and teal
- **Custom**: User-defined colors (default: purple theme)

### **Tablet Optimizations**
- **Touch Targets**: Minimum 44px
- **Text Size**: Minimum 16px for readability
- **Spacing**: Generous padding for touch interaction
- **Orientation**: Works in both portrait and landscape

---

## 🚀 **Future: Executable Wireframes**

### **Concept**: Play Button for Logic Execution
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ] [▶️ Execute] [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Execution Features:**
- **Input Sliders**: Salary range, percentage values
- **Dynamic Outcomes**: Real-time calculation based on inputs
- **Scenario Testing**: "What if salary is $75k instead of $80k?"
- **Export Results**: Save execution results as data

**Implementation Plan:**
- **Day 4**: Add execution framework to component architecture
- **Day 5**: Implement basic execution with mock data
- **Post-MVP**: Real-time execution with user inputs

---

## 📱 **Responsive Breakpoints**

### **Tablet (iPad Air, Google Pixel)**
- **Portrait**: 768px width, 3-column layout
- **Landscape**: 1024px width, 3-column layout
- **Touch**: Optimized for finger interaction

### **Desktop**
- **Small**: 1280px width, 3-column layout
- **Large**: 1920px width, 3-column layout
- **Mouse**: Hover states and precise interaction

### **Mobile (Future)**
- **Portrait**: 375px width, single-column layout
- **Landscape**: 667px width, 2-column layout
- **Touch**: Large buttons and simplified interface
