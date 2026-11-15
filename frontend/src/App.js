import React, { useState, useEffect } from 'react';
import profileLogo from './astrobee-profile.jpg';
import './App.css';
import CrystalsPage from './CrystalsPage';

const services = [
  {
    number: '01',
    name: 'Astrology',
    description: 'Explore astrological themes and cycles as a way to reflect on questions and personal experiences.',
  },
  {
    number: '02',
    name: 'Numerology',
    description: 'Explore the symbolic meanings of numbers and the patterns they may bring into focus.',
  },
  {
    number: '03',
    name: 'Chakra balancing',
    description: 'A mindful practice centered on the chakras and cultivating a sense of inner balance.',
  },
  {
    number: '04',
    name: 'Crystal guidance',
    description: 'Learn about crystals and explore ways to choose them for personal intention and ritual.',
  },
  {
    number: '05',
    name: 'Cord cutting',
    description: 'A reflective practice for acknowledging attachments and setting intentions for moving forward.',
  },
];

function App() {
  const [theme, setTheme] = useState('light');
  const [backendStatus, setBackendStatus] = useState('Checking backend...');
  const [backendInfo, setBackendInfo] = useState('Loading API info...');
  const isCrystalsPage = new URLSearchParams(window.location.search).get('page') === 'crystals';

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
          <img src={profileLogo} alt="Astrobee 33 logo" className="brand-logo" />
          <div className="brand-copy">
            <span className="brand-kicker">Astrology & energy guidance</span>
            <h1>Astrobee 33</h1>
          </div>
        </div>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="/" aria-current={!isCrystalsPage ? 'page' : undefined}>
            Guidance
          </a>
          <a href="/?page=crystals" aria-current={isCrystalsPage ? 'page' : undefined}>
            Crystals
          </a>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="page-shell">
        {isCrystalsPage ? (
          <CrystalsPage />
        ) : (
          <>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Astrology · Numerology · Energy guidance</p>
            <h2>Find a little more meaning in your journey.</h2>
            <p className="lead">
              Bhumika Rittimath of Astrobee 33 shares astrology, numerology, chakra
              balancing, crystal guidance, and cord cutting.
            </p>

            <div className="cta-row">
              <a href="#services" className="primary-btn">Explore services</a>
              <a
                href="https://www.instagram.com/astrobee_33/"
                className="secondary-btn"
                target="_blank"
                rel="noreferrer"
              >
                Visit Instagram
              </a>
            </div>

            <ul className="benefits-list" aria-label="Profile services">
              <li>Astrology</li>
              <li>Numerology</li>
              <li>Chakra balancing</li>
              <li>Crystal guidance</li>
              <li>Cord cutting</li>
            </ul>
          </div>

          <div className="hero-feature">
            <div className="feature-card feature-card-main">
              <span className="mini-label">Meet your guide</span>
              <h3>Bhumika Rittimath</h3>
              <p>Astrologer · Numerologist · Crystal guide</p>
              <img src={profileLogo} alt="Astrobee 33 profile logo" className="profile-mark" />
            </div>
          </div>
        </section>

        <section id="about" className="info-strip">
          <div>
            <strong>Astrology</strong>
            <span>One of the practices featured on the Astrobee 33 profile.</span>
          </div>
          <div>
            <strong>Numerology</strong>
            <span>Numerology is also listed among Bhumika's areas of guidance.</span>
          </div>
          <div>
            <strong>Energy practices</strong>
            <span>Chakra balancing, crystal guidance, and cord cutting.</span>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="section-heading">
            <p className="eyebrow">Astrobee 33</p>
            <h3>Guidance & practices</h3>
            <p className="section-description">
              Astrobee 33's profile lists these practices. For current session details,
              connect with Bhumika directly.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.number} className="service-card">
                <span className="service-number">{service.number}</span>
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-link">
          <div>
            <span className="status-label">Instagram</span>
            <strong>@astrobee_33</strong>
          </div>
          <a
            href="https://www.instagram.com/astrobee_33/"
            className="primary-btn"
            target="_blank"
            rel="noreferrer"
          >
            View profile
          </a>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
