import MainLayout from './components/MainLayout'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    </div>
  )
}

export default App
