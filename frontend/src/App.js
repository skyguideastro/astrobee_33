import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [backendStatus, setBackendStatus] = useState('Checking backend...');
  const [backendInfo, setBackendInfo] = useState('Loading API info...');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        const healthResponse = await fetch('/health');
        const healthText = healthResponse.ok ? await healthResponse.text() : 'Unavailable';
        setBackendStatus(healthText === 'OK' ? 'Backend online' : 'Backend unavailable');

        const infoResponse = await fetch('/api/info');
        if (infoResponse.ok) {
          setBackendInfo(await infoResponse.text());
        } else {
          setBackendInfo('API info unavailable');
        }
      } catch (error) {
        setBackendStatus('Backend unavailable');
        setBackendInfo('API info unavailable');
      }
    };

    fetchBackendStatus();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <p>
          Backend status: <strong>{backendStatus}</strong>
        </p>
        <p>
          API info: <strong>{backendInfo}</strong>
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
      </header>
    </div>
  );
}

export default App;
