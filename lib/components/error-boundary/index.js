/**
 * @format
 * @flow
 */

import type { Node } from 'React'
import { Component } from 'react'
import Fallback from 'components/error-boundary/fallback'
import { logError } from 'utils/dev'

type ErrorBoundaryProps = {
  children: React$Node,
  ...
}

type ErrorBoundaryState = {|
  hasError: boolean,
|}

type ErrorInfo = { componentStack: string, ... }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): {| hasError: boolean |} {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo.componentStack)
  }

  render(): React$Node | Node {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <Fallback />
    }

    return children
  }
}

export default ErrorBoundary
