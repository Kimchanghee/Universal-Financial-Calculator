import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Lazy load App for better performance
const App = lazy(() => import('./App'));

const GA_ID = import.meta.env.VITE_GA_ID?.trim();
const GA_PLACEHOLDER = 'G-XXXXXXXXXX';

const hasValidGaId = Boolean(GA_ID && GA_ID !== GA_PLACEHOLDER);

if (
  hasValidGaId &&
  typeof window.gtag !== 'function' &&
  !document.getElementById('ga-script')
) {
  const gaScript = document.createElement('script');
  gaScript.id = 'ga-script';
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
