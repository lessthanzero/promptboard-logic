# Design Tokens - Comprehensive Style Guide

## 🎨 **Color System**

### **Node Colors (Primary)**
```css
/* Condition Node - Blue Theme */
.condition-node {
  @apply bg-blue-100 border-blue-500 text-blue-900;
  @apply focus:ring-2 focus:ring-blue-300;
  @apply aria-selected:bg-blue-200;
  @apply hover:bg-blue-50;
  @apply transition-colors duration-200;
}

/* Action Node - Green Theme */
.action-node {
  @apply bg-green-100 border-green-500 text-green-900;
  @apply focus:ring-2 focus:ring-green-300;
  @apply aria-selected:bg-green-200;
  @apply hover:bg-green-50;
  @apply transition-colors duration-200;
}

/* Outcome Node - Orange Theme */
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
/* PM Theme - Business Focus */
.pm-theme {
  @apply bg-gray-50 text-gray-900;
  --primary: theme('colors.blue.500');
  --secondary: theme('colors.gray.500');
  --accent: theme('colors.blue.100');
  --muted: theme('colors.gray.100');
}

/* Researcher Theme - Academic Focus */
.researcher-theme {
  @apply bg-slate-50 text-slate-900;
  --primary: theme('colors.teal.500');
  --secondary: theme('colors.slate.500');
  --accent: theme('colors.teal.100');
  --muted: theme('colors.slate.100');
}

/* Custom Theme - User-defined */
.custom-theme {
  @apply bg-purple-50 text-purple-900;
  --primary: theme('colors.purple.500');
  --secondary: theme('colors.purple.500');
  --accent: theme('colors.purple.100');
  --muted: theme('colors.purple.100');
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

/* Button sizing */
.touch-button {
  @apply px-4 py-3 text-base font-medium;
  @apply min-h-[44px] min-w-[44px];
  @apply rounded-lg border-2;
  @apply transition-all duration-200;
  @apply focus:ring-2 focus:ring-offset-2;
}
```

### **Responsive Grid System**
```css
/* Mobile (future) */
@media (max-width: 375px) {
  .main-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vh;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateY(0);
  }
}

/* Tablet Portrait */
@media (min-width: 376px) and (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .prompt-panel {
    order: 1;
    height: 200px;
  }
  
  .canvas-area {
    order: 2;
    height: calc(100vh - 400px);
  }
  
  .sidebar {
    order: 3;
    height: 200px;
  }
}

/* Tablet Landscape */
@media (min-width: 769px) and (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 320px 1fr 320px;
    grid-template-rows: 1fr;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .main-layout {
    grid-template-columns: 320px 1fr 320px;
    grid-template-rows: 1fr;
  }
}
```

---

## 🎭 **Persona-Specific Styling**

### **PM Mode (Business)**
```css
.pm-mode {
  /* Business-focused colors */
  --primary: #3b82f6; /* blue-500 */
  --secondary: #6b7280; /* gray-500 */
  --accent: #dbeafe; /* blue-100 */
  --muted: #f3f4f6; /* gray-100 */
  
  /* Business typography */
  --font-family: 'Inter', system-ui, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Business spacing */
  --spacing-tight: 8px;
  --spacing-normal: 16px;
  --spacing-loose: 24px;
}

.pm-mode .hints-card {
  @apply bg-blue-50 border-blue-200 text-blue-900;
}

.pm-mode .sample-button {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}
```

### **Researcher Mode (Academic)**
```css
.researcher-mode {
  /* Academic-focused colors */
  --primary: #14b8a6; /* teal-500 */
  --secondary: #64748b; /* slate-500 */
  --accent: #ccfbf1; /* teal-100 */
  --muted: #f1f5f9; /* slate-100 */
  
  /* Academic typography */
  --font-family: 'Source Serif Pro', Georgia, serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Academic spacing */
  --spacing-tight: 12px;
  --spacing-normal: 20px;
  --spacing-loose: 32px;
}

.researcher-mode .hints-card {
  @apply bg-teal-50 border-teal-200 text-teal-900;
}

.researcher-mode .sample-button {
  @apply bg-teal-500 text-white hover:bg-teal-600;
}
```

### **Custom Mode (User-defined)**
```css
.custom-mode {
  /* User-defined colors (default: purple) */
  --primary: #8b5cf6; /* purple-500 */
  --secondary: #8b5cf6; /* purple-500 */
  --accent: #ede9fe; /* purple-100 */
  --muted: #faf5ff; /* purple-50 */
  
  /* Custom typography */
  --font-family: 'Inter', system-ui, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Custom spacing */
  --spacing-tight: 10px;
  --spacing-normal: 18px;
  --spacing-loose: 28px;
}

.custom-mode .hints-card {
  @apply bg-purple-50 border-purple-200 text-purple-900;
}

.custom-mode .sample-button {
  @apply bg-purple-500 text-white hover:bg-purple-600;
}
```

---

## 🔤 **Typography System**

### **Font Families**
```css
/* Primary font for UI */
.font-primary {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Academic font for researcher mode */
.font-academic {
  font-family: 'Source Serif Pro', Georgia, serif;
}

/* Monospace for code/JSON */
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### **Text Sizes**
```css
/* Tablet-optimized text sizes */
.text-xs { font-size: 12px; line-height: 1.5; }
.text-sm { font-size: 14px; line-height: 1.5; }
.text-base { font-size: 16px; line-height: 1.5; } /* Minimum for tablets */
.text-lg { font-size: 18px; line-height: 1.5; }
.text-xl { font-size: 20px; line-height: 1.4; }
.text-2xl { font-size: 24px; line-height: 1.3; }
.text-3xl { font-size: 30px; line-height: 1.2; }
```

### **Font Weights**
```css
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## 🎯 **Interactive States**

### **Button States**
```css
/* Primary Button */
.btn-primary {
  @apply bg-blue-500 text-white;
  @apply hover:bg-blue-600;
  @apply focus:ring-2 focus:ring-blue-300;
  @apply active:bg-blue-700;
  @apply disabled:bg-gray-300 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-gray-100 text-gray-900 border border-gray-300;
  @apply hover:bg-gray-200;
  @apply focus:ring-2 focus:ring-gray-300;
  @apply active:bg-gray-300;
  @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
}

/* Destructive Button */
.btn-destructive {
  @apply bg-red-500 text-white;
  @apply hover:bg-red-600;
  @apply focus:ring-2 focus:ring-red-300;
  @apply active:bg-red-700;
  @apply disabled:bg-gray-300 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
}
```

### **Input States**
```css
/* Text Input */
.input {
  @apply border border-gray-300 rounded-lg px-3 py-2;
  @apply focus:ring-2 focus:ring-blue-300 focus:border-blue-500;
  @apply hover:border-gray-400;
  @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
}

/* Textarea */
.textarea {
  @apply border border-gray-300 rounded-lg px-3 py-2;
  @apply focus:ring-2 focus:ring-blue-300 focus:border-blue-500;
  @apply hover:border-gray-400;
  @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
  @apply resize-vertical;
}
```

### **Node States**
```css
/* Node Hover */
.node:hover {
  @apply shadow-md transform scale-105;
  @apply transition-all duration-200;
}

/* Node Selected */
.node.selected {
  @apply ring-2 ring-blue-300;
  @apply shadow-lg;
}

/* Node Editing */
.node.editing {
  @apply ring-2 ring-green-300;
  @apply shadow-lg;
}

/* Node Error */
.node.error {
  @apply ring-2 ring-red-300;
  @apply bg-red-50;
}
```

---

## 🚀 **Future: Executable Logic Styling**

### **Execution Button**
```css
.execute-button {
  @apply bg-green-500 text-white;
  @apply hover:bg-green-600;
  @apply focus:ring-2 focus:ring-green-300;
  @apply active:bg-green-700;
  @apply transition-colors duration-200;
  @apply flex items-center gap-2;
}

.execute-button:before {
  content: "▶️";
  font-size: 16px;
}
```

### **Input Controls**
```css
/* Slider Input */
.slider-input {
  @apply w-full h-2 bg-gray-200 rounded-lg;
  @apply focus:ring-2 focus:ring-blue-300;
  @apply transition-colors duration-200;
}

.slider-input::-webkit-slider-thumb {
  @apply w-6 h-6 bg-blue-500 rounded-full;
  @apply cursor-pointer;
  @apply focus:ring-2 focus:ring-blue-300;
}

/* Number Input */
.number-input {
  @apply border border-gray-300 rounded-lg px-3 py-2;
  @apply focus:ring-2 focus:ring-blue-300 focus:border-blue-500;
  @apply text-center font-mono;
}

/* Boolean Input */
.boolean-input {
  @apply flex items-center gap-2;
  @apply p-2 rounded-lg border border-gray-300;
  @apply hover:bg-gray-50;
  @apply focus:ring-2 focus:ring-blue-300;
}
```

### **Results Display**
```css
/* Outcome Display */
.outcome-display {
  @apply bg-green-50 border border-green-200 rounded-lg p-4;
  @apply text-green-900;
}

/* Scenario Comparison */
.scenario-comparison {
  @apply grid grid-cols-2 gap-4;
  @apply p-4 bg-gray-50 rounded-lg;
}

/* Export Results */
.export-results {
  @apply flex gap-2;
  @apply p-2 bg-gray-100 rounded-lg;
}
```

---

## 📐 **Spacing System**

### **Consistent Spacing**
```css
/* Spacing scale */
.space-1 { margin: 4px; }
.space-2 { margin: 8px; }
.space-3 { margin: 12px; }
.space-4 { margin: 16px; }
.space-6 { margin: 24px; }
.space-8 { margin: 32px; }

/* Padding scale */
.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
.p-3 { padding: 12px; }
.p-4 { padding: 16px; }
.p-6 { padding: 24px; }
.p-8 { padding: 32px; }
```

### **Component Spacing**
```css
/* Card spacing */
.card {
  @apply p-6 space-y-4;
}

/* Button spacing */
.button-group {
  @apply flex gap-2;
}

/* Form spacing */
.form-group {
  @apply space-y-2;
}

/* Layout spacing */
.layout-section {
  @apply space-y-6;
}
```

---

## 🎨 **Animation System**

### **Transitions**
```css
/* Standard transition */
.transition {
  @apply transition-all duration-200 ease-in-out;
}

/* Fast transition */
.transition-fast {
  @apply transition-all duration-100 ease-in-out;
}

/* Slow transition */
.transition-slow {
  @apply transition-all duration-300 ease-in-out;
}
```

### **Hover Effects**
```css
/* Subtle hover */
.hover-subtle {
  @apply hover:bg-gray-50 hover:shadow-sm;
  @apply transition-all duration-200;
}

/* Strong hover */
.hover-strong {
  @apply hover:bg-blue-50 hover:shadow-md hover:scale-105;
  @apply transition-all duration-200;
}
```

### **Loading States**
```css
/* Skeleton loading */
.skeleton {
  @apply animate-pulse bg-gray-200 rounded;
}

/* Spinner */
.spinner {
  @apply animate-spin rounded-full border-2 border-gray-300 border-t-blue-500;
}
```

---

## 🔧 **Utility Classes**

### **Layout Utilities**
```css
/* Flexbox utilities */
.flex-center {
  @apply flex items-center justify-center;
}

.flex-between {
  @apply flex items-center justify-between;
}

.flex-start {
  @apply flex items-start;
}

/* Grid utilities */
.grid-3 {
  @apply grid grid-cols-3 gap-4;
}

.grid-2 {
  @apply grid grid-cols-2 gap-4;
}
```

### **Text Utilities**
```css
/* Text truncation */
.truncate {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}

/* Text selection */
.select-none {
  @apply select-none;
}

.select-text {
  @apply select-text;
}
```

### **Visibility Utilities**
```css
/* Show/hide */
.show { @apply block; }
.hide { @apply hidden; }

/* Responsive visibility */
.show-mobile { @apply block md:hidden; }
.show-desktop { @apply hidden md:block; }
```
