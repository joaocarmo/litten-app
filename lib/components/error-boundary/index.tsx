import type { ReactNode } from 'react'
import { Component } from 'react'
import Fallback from '@components/error-boundary/fallback'
import { logError } from '@utils/dev'

type ErrorBoundaryProps = {
  children: ReactNode
}
type ErrorBoundaryState = {
  hasError: boolean
}
type ErrorInfo = {
  componentStack: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): {
    hasError: boolean
  } {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo.componentStack)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <Fallback />
    }

    return children
  }
}

export default ErrorBoundary
