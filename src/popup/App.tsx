import React, { useEffect, useState, lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    // Simple hash-based routing
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render the appropriate component based on the current route
  const renderRoute = () => {
    return (
      <Suspense fallback={<Loading />}>
        {(() => {
          switch (currentRoute) {
            case '#/signup':
              return <SignupPage />;
            case '#/login':
              return <LoginPage />;
            default:
              return <HomePage />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <AuthProvider>
      {renderRoute()}
    </AuthProvider>
  );
}