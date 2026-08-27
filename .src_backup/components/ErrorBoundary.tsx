import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
          <div className="max-w-3xl w-full bg-slate-800 p-8 rounded-xl border border-red-500/30 overflow-auto">
            <div className="flex items-center gap-4 mb-6 text-red-400">
              <AlertCircle size={48} />
              <h2 className="text-2xl font-bold">Something went wrong</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Error:</h3>
              <pre className="bg-slate-950 p-4 rounded-lg text-red-300 text-sm overflow-x-auto whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Component Stack:</h3>
              <pre className="bg-slate-950 p-4 rounded-lg text-slate-300 text-sm overflow-x-auto whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
