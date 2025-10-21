# Error States - Specific Error Scenarios

## 🚨 **Error State Design System**

Based on mock data from Day 2, here are the specific error scenarios and their user-friendly responses.

---

## 📋 **Error Types & Responses**

### **1. Parsing Failed**
```typescript
interface ParsingError {
  title: "Could not parse prompt"
  message: "Please try rephrasing your logic in simpler terms"
  suggestions: [
    "Use 'if...then...' statements",
    "Keep it to 2-3 sentences",
    "Avoid complex nested conditions"
  ]
  actions: ["Try Again", "Use Sample", "Get Help"]
  icon: "⚠️"
  severity: "warning"
}
```

**Visual Design:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌───────────────────────────┐   ││                                            │
│ │ Textarea: "Complex nested condition..." │ ││  │  ⚠️ Could not parse prompt │   ││ JSON (error):                              │
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

**Recovery Actions:**
- **Try Again**: Clear textarea, show hints, focus input
- **Use Sample**: Load sample prompt, show success
- **Get Help**: Open help modal with examples

---

### **2. Network Error**
```typescript
interface NetworkError {
  title: "Connection failed"
  message: "Unable to process your request"
  suggestions: [
    "Check your internet connection",
    "Try again in a moment",
    "Use the sample prompts to get started"
  ]
  actions: ["Retry", "Work Offline", "Contact Support"]
  icon: "🌐"
  severity: "error"
}
```

**Visual Design:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌───────────────────────────┐   ││                                            │
│ │ Textarea: "If user skips onboarding..." │ ││  │  🌐 Connection failed      │   ││ JSON (error):                              │
│ └────────────────────────────────────────┘ ││  │                           │   ││  { "error": "network_error" }              │
│ [Generate Logic]  [Sample] [Clear]         ││  │  Unable to process your    │   ││ ─────────────────────────────────────────  │
│                                            ││  │  request                   │   ││ Assistant (error):                         │
│ Card: "Hints"                              ││  │                           │   ││  • Check your internet connection         │
│ - Keep it short (2–3 sentences)            ││  │  Suggestions:              │   ││  • Try again in a moment                  │
│ - Use "if… then…" statements               ││  │  • Check your connection   │   ││  • Use the sample prompts to get started  │
│                                            ││  │  • Try again in a moment   │   ││                                            │
│ Mode: [PM ▼] [Researcher] [Custom...]      ││  │  • Use sample prompts      │   ││ [Retry] [Work Offline] [Contact Support]  │
└────────────────────────────────────────────┘│  └───────────────────────────┘   │└────────────────────────────────────────────┘
```

**Recovery Actions:**
- **Retry**: Attempt network request again
- **Work Offline**: Enable offline mode with cached samples
- **Contact Support**: Open support modal with contact info

---

### **3. Storage Full**
```typescript
interface StorageError {
  title: "Storage limit reached"
  message: "Cannot save your changes"
  suggestions: [
    "Clear browser data",
    "Export your logic and start fresh",
    "Contact support if this persists"
  ]
  actions: ["Clear Data", "Export & Reset", "Contact Support"]
  icon: "💾"
  severity: "error"
}
```

**Visual Design:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
│  [ PromptBoard ]           [New] [Open]                     [? Help] [Theme] │
└──────────────────────────────────────────────────────────────────────────────┘
┌─────────────── LEFT (Prompt) ───────────────┐┌──────────── CENTER (Canvas) ──┐┌───────────── RIGHT (Sidebar) ──────────────┐
│ Card: "Describe your logic"                ││                                  ││ Tabs: [ JSON ] [ Assistant ]              │
│ ┌────────────────────────────────────────┐ ││  ┌───────────────────────────┐   ││                                            │
│ │ Textarea: "If user skips onboarding..." │ ││  │  💾 Storage limit reached  │   ││ JSON (error):                              │
│ └────────────────────────────────────────┘ ││  │                           │   ││  { "error": "storage_full" }              │
│ [Generate Logic]  [Sample] [Clear]         ││  │  Cannot save your changes  │   ││ ─────────────────────────────────────────  │
│                                            ││  │                           │   ││ Assistant (error):                         │
│ Card: "Hints"                              ││  │  Suggestions:              │   ││  • Clear browser data                      │
│ - Keep it short (2–3 sentences)            ││  │  • Clear browser data     │   ││  • Export your logic and start fresh      │
│ - Use "if… then…" statements               ││  │  • Export and start fresh │   ││  • Contact support if this persists      │
│                                            ││  │  • Contact support        │   ││                                            │
│ Mode: [PM ▼] [Researcher] [Custom...]      ││  └───────────────────────────┘   ││ [Clear Data] [Export & Reset] [Contact]   │
└────────────────────────────────────────────┘└──────────────────────────────────┘└────────────────────────────────────────────┘
```

**Recovery Actions:**
- **Clear Data**: Clear localStorage, show confirmation
- **Export & Reset**: Download current state, then clear
- **Contact Support**: Open support modal with issue details

---

## 🔄 **Error Recovery Patterns**

### **1. Graceful Degradation**
```typescript
// When AI parsing fails, fall back to manual node creation
const handleParsingError = (error: ParsingError) => {
  // Show error message
  showErrorToast(error.message)
  
  // Enable manual mode
  setManualMode(true)
  
  // Show node creation buttons
  showNodeCreationButtons()
  
  // Provide helpful hints
  showParsingHints()
}
```

### **2. Retry with Backoff**
```typescript
// Network error retry with exponential backoff
const retryWithBackoff = async (fn: Function, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
    }
  }
}
```

### **3. Offline Mode**
```typescript
// When network fails, enable offline mode
const enableOfflineMode = () => {
  // Use cached samples
  setAvailableSamples(cachedSamples)
  
  // Disable AI features
  setAIFeaturesEnabled(false)
  
  // Show offline indicator
  showOfflineIndicator()
  
  // Enable manual editing
  setManualMode(true)
}
```

---

## 🎨 **Error State Styling**

### **Error Container**
```css
.error-container {
  @apply bg-red-50 border border-red-200 rounded-lg p-6;
  @apply text-red-900;
  @apply animate-in slide-in-from-top duration-300;
}

.error-icon {
  @apply text-red-500 text-2xl mb-4;
}

.error-title {
  @apply text-lg font-semibold mb-2;
}

.error-message {
  @apply text-sm mb-4;
}

.error-suggestions {
  @apply space-y-2 mb-6;
}

.error-suggestions li {
  @apply text-sm text-red-700;
}

.error-actions {
  @apply flex gap-2;
}
```

### **Error Buttons**
```css
.error-button-primary {
  @apply bg-red-500 text-white px-4 py-2 rounded-lg;
  @apply hover:bg-red-600;
  @apply focus:ring-2 focus:ring-red-300;
  @apply transition-colors duration-200;
}

.error-button-secondary {
  @apply bg-red-100 text-red-900 px-4 py-2 rounded-lg;
  @apply hover:bg-red-200;
  @apply focus:ring-2 focus:ring-red-300;
  @apply transition-colors duration-200;
}
```

---

## 📱 **Tablet Error States**

### **Touch-Friendly Error Actions**
```css
/* Larger touch targets for error buttons */
.error-button {
  @apply min-h-[44px] min-w-[44px];
  @apply px-4 py-3 text-base font-medium;
  @apply rounded-lg border-2;
  @apply transition-all duration-200;
  @apply focus:ring-2 focus:ring-offset-2;
}

/* Error message sizing for tablets */
.error-message {
  @apply text-base leading-relaxed;
  @apply max-w-md;
}

/* Error suggestions list */
.error-suggestions {
  @apply space-y-3;
}

.error-suggestions li {
  @apply text-base leading-relaxed;
  @apply flex items-start gap-2;
}

.error-suggestions li:before {
  content: "•";
  @apply text-red-500 font-bold;
  @apply mt-1;
}
```

---

## 🔧 **Error State Implementation**

### **Error Boundary Component**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">{error.message}</p>
      <div className="error-actions">
        <button onClick={resetError} className="error-button-primary">
          Try Again
        </button>
        <button onClick={() => window.location.reload()} className="error-button-secondary">
          Reload Page
        </button>
      </div>
    </div>
  )
}
```

### **Error Toast System**
```typescript
interface ErrorToast {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  actions?: ToastAction[]
  duration?: number
}

const showErrorToast = (error: ErrorToast) => {
  toast({
    id: error.id,
    title: error.title,
    description: error.message,
    variant: 'destructive',
    action: error.actions?.[0],
    duration: error.duration || 5000
  })
}
```

---

## 🚀 **Future: Advanced Error Handling**

### **Error Analytics**
```typescript
// Track error patterns for improvement
const trackError = (error: Error, context: ErrorContext) => {
  analytics.track('error_occurred', {
    error_type: error.name,
    error_message: error.message,
    user_context: context,
    timestamp: new Date().toISOString()
  })
}
```

### **Error Recovery Suggestions**
```typescript
// AI-powered error recovery suggestions
const getRecoverySuggestions = async (error: Error) => {
  const suggestions = await aiService.getRecoverySuggestions({
    error_type: error.name,
    error_message: error.message,
    user_context: getCurrentContext()
  })
  
  return suggestions
}
```

### **Proactive Error Prevention**
```typescript
// Prevent errors before they happen
const validateBeforeAction = (action: string, data: any) => {
  const validation = getValidationRules(action)
  const errors = validateData(data, validation)
  
  if (errors.length > 0) {
    showPreventionToast(errors)
    return false
  }
  
  return true
}
```
