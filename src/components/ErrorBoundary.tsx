import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
              Something went wrong
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            {/* Recovery suggestions */}
            <div className="bg-red-100 dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Try these solutions:</h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Refresh the page to reload the application</li>
                <li>• Clear your browser cache and try again</li>
                <li>• Check your internet connection</li>
                <li>• Try using a different browser</li>
              </ul>
            </div>
            
            <div className="btn-group">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="btn-primary"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
