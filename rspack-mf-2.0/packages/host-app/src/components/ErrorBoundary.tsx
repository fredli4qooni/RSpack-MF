import { Component, type ErrorInfo, type ReactNode } from 'react';

// mengUbah 'fallback' menjadi fungsi render prop
// memungkinkan untuk meneruskan fungsi 'reset' ke UI fallback
type FallbackRender = (props: { resetErrorBoundary: () => void }) => ReactNode;

interface Props {
  children: ReactNode;
  fallbackRender: FallbackRender; // Menggunakan render prop
  onReset?: () => void; // Callback opsional saat reset
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary yang dapat direset.
 * Komponen ini tidak hanya menangkap error, tetapi juga menyediakan fungsi
 * untuk mencoba me-render ulang MFE yang gagal.
 *
 * @component
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in a Microfrontend:", error, errorInfo);
  }

  // fungsi untuk mereset state error
  public resetErrorBoundary = () => {
    this.props.onReset?.(); // Panggil callback onReset jika ada
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      // memanggil fungsi fallbackRender dan teruskan metode reset
      return this.props.fallbackRender({
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;