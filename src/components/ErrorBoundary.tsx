import React, { Component, ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to your preferred error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 text-center mb-4">
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            {this.state.error && (
              <div className="bg-red-50 rounded p-3 mb-4">
                <p className="text-sm text-red-800 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
