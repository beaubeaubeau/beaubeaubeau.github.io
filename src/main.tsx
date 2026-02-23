import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

function Root() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if we're on the March Madness path
  const isMarchMadnessPath = pathname === '/MarchMadness' || pathname === '/MarchMadness/' || pathname.startsWith('/MarchMadness/');

  if (!isMarchMadnessPath) {
    // Render nothing or a simple message for other paths
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome</h1>
        <p>This page is not available.</p>
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

