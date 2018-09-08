import React, { PureComponent, Fragment } from 'react'

interface ErrorBoundaryState {
  error: Error | null
}

interface ErrorBoundaryProps {
  message: string
  children: JSX.Element
  fallback?: string | JSX.Element
}

export default class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    })
  }

  render() {
    const { message, children, fallback } = this.props
    const { error } = this.state

    const errorComponent = fallback || (
        <Fragment>
          <h2>Something went wrong.</h2>
          <span>{message}</span>
        </Fragment>
      )

    if (error) {
      return errorComponent
    }
    return children
  }
}
