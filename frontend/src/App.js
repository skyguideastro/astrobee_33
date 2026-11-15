import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const crystalCollection = [
  {
    name: 'Rose Quartz',
    mood: 'Love & self-trust',
    color: 'rose',
    description: 'A soft heart-stone for emotional healing, gentleness, and opening to compassion.',
  },
  {
    name: 'Amethyst',
    mood: 'Calm & intuition',
    color: 'purple',
    description: 'A soothing crystal for rest, clarity, and connecting with your inner wisdom.',
  },
  {
    name: 'Clear Quartz',
    mood: 'Focus & energy',
    color: 'clear',
    description: 'An amplifier stone for intention-setting, focus, and bringing your goals into motion.',
  },
  {
    name: 'Citrine',
    mood: 'Joy & abundance',
    color: 'gold',
    description: 'A radiant stone for optimism, confidence, and fresh momentum in your day.',
  },
];

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
      <header className="topbar">
        <div className="brand-wrap">
          <img src={logo} alt="Astrobee 33 logo" className="brand-logo" />
          <div className="brand-copy">
            <span className="brand-kicker">Crystals by</span>
            <h1>Astrobee 33</h1>
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="page-shell">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Natural stones • ritual energy • small-batch</p>
            <h2>Crystals for calm, clarity, and intention.</h2>
            <p className="lead">
              Thoughtfully chosen stones to support grounding, self-love, and a softer daily rhythm.
            </p>

            <div className="cta-row">
              <a href="#shop" className="primary-btn">Shop the collection</a>
              <a href="#about" className="secondary-btn">Learn more</a>
            </div>

            <ul className="benefits-list">
              <li>Ethically sourced pieces</li>
              <li>Handpicked for energy</li>
              <li>Perfect for altars & rituals</li>
            </ul>
          </div>

          <div className="hero-feature">
            <div className="feature-card feature-card-main">
              <span className="mini-label">Featured crystal</span>
              <h3>Rose Quartz</h3>
              <p>Soft, grounding, and full of heart-centered energy.</p>
              <div className="gem gem-rose" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="about" className="info-strip">
          <div>
            <strong>Energy-first</strong>
            <span>Curated for intention and everyday ritual.</span>
          </div>
          <div>
            <strong>Beautifully chosen</strong>
            <span>Natural textures, grounding colors, and elevated vibes.</span>
          </div>
          <div>
            <strong>Made with care</strong>
            <span>Thoughtful sourcing and mindful curation.</span>
          </div>
        </section>

        <section id="shop" className="shop-section">
          <div className="section-heading">
            <p className="eyebrow">The collection</p>
            <h3>Crystal essentials</h3>
          </div>

          <div className="crystal-grid">
            {crystalCollection.map((crystal) => (
              <article key={crystal.name} className={`crystal-card ${crystal.color}`}>
                <div className={`gem gem-${crystal.color}`} aria-hidden="true" />
                <span className="chip">{crystal.mood}</span>
                <h4>{crystal.name}</h4>
                <p>{crystal.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="status-panel">
          <div>
            <span className="status-label">Backend status</span>
            <strong>{backendStatus}</strong>
          </div>
          <div>
            <span className="status-label">API info</span>
            <strong>{backendInfo}</strong>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
