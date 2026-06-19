import React from 'react';

/**
 * @fileoverview ErrorBoundary component that catches JavaScript errors in child
 * component trees, logs them, and renders a user-friendly fallback UI.
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

/**
 * ErrorBoundary wraps child components to gracefully handle runtime errors.
 * Prevents the entire application from crashing due to a single component failure.
 *
 * @class ErrorBoundary
 * @extends {React.Component}
 *
 * @example
 * <ErrorBoundary>
 *   <Dashboard />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  /**
   * Creates an ErrorBoundary instance.
   * @param {Object} props - Component props
   * @param {React.ReactNode} props.children - Child components to wrap
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Derive state from a caught error. Called during the render phase.
   * @param {Error} error - The error that was thrown
   * @returns {Object} Updated state indicating an error occurred
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error details for debugging. Called during the commit phase.
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Object containing componentStack trace
   */
  componentDidCatch(error, errorInfo) {
    console.error('[EcoTrace ErrorBoundary] Caught error:', error, errorInfo);
  }

  /**
   * Reset the error state to allow retry.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            className="glass-panel p-8"
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: '#f87171',
              }}
            >
              ⚠️ Something went wrong
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred while rendering this section.
              Please try again or refresh the page.
            </p>
            {this.state.error && (
              <details
                style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '1rem',
                  textAlign: 'left',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                }}
              >
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Error Details
                </summary>
                <code>{this.state.error.message}</code>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="btn-primary"
              style={{ margin: '0 auto' }}
              aria-label="Try again to reload the component"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
