import MainLayout from './components/MainLayout'
import ErrorBoundary from './components/ErrorBoundary'
import ToastContainer from './components/ToastContainer'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useToast } from './hooks/useToast'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import './App.css'

function AppContent() {
  const { toasts, removeToast } = useToast()
  useKeyboardShortcuts()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ErrorBoundary>
        <MainLayout />
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </ErrorBoundary>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
