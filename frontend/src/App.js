import React, { useState, useEffect } from 'react';
import profileLogo from './astrobee-profile.png';
import './App.css';
import CrystalsPage from './CrystalsPage';
import getPublicUrl from './publicUrl';
import sessionReviews from './sessionReviews';

const whatsappNumber = '917795119975';

const services = [
  {
    number: '01',
    name: 'Astrology',
    description: 'Explore birth-chart themes, cycles, and personal questions as prompts for reflection.',
    focus: 'A thoughtful conversation about the themes you would like to explore.',
    preparation: 'Have your birth date, birth time (as accurate as you know it), and birth city, state, and country ready. Confirm what is needed and share these details privately.',
  },
  {
    number: '02',
    name: 'Chakra balancing',
    description: 'A mindful practice centered on chakra concepts and a sense of inner balance.',
    focus: 'Discuss the intentions and practices that feel supportive to you.',
    preparation: 'Think about what you would like to focus on, such as calm, focus, or balance, and whether you are open to meditation or guided visualization. No health details are needed; this is not medical care.',
  },
  {
    number: '03',
    name: 'Crystal guidance',
    description: 'Learn about traditional crystal associations and choose pieces for personal intention.',
    focus: 'Explore crystal options, meanings, and ways to use them in a personal practice.',
    preparation: 'Think about an intention or area of life you would like to reflect on, such as focus or confidence. Crystal meanings vary by tradition and do not guarantee outcomes.',
  },
  {
    number: '04',
    name: 'Cord cutting',
    description: 'A reflective practice for acknowledging attachments and setting intentions for moving forward.',
    focus: 'A reflective space to name what you are ready to release and what you want to nurture.',
    preparation: 'Consider the relationship or attachment you would like to reflect on and whether you feel ready to explore moving forward. Share only what feels comfortable.',
  },
  {
    number: '05',
    name: 'Tarot',
    description: 'Explore card symbolism as a prompt for reflection on questions, patterns, and possible perspectives.',
    focus: 'Bring a question to explore through the themes and symbols in the cards.',
    preparation: 'Bring an open-ended question or life area, such as career, relationships, or a decision. Tarot offers reflection, not guaranteed predictions.',
  },
];

const insights = [
  {
    date: '15 November 2026',
    category: 'Astrology basics',
    title: 'Sun, Moon & Rising',
    description: 'These chart points are often used as a starting place for reflection. They offer different symbolic lenses, not a complete definition of who you are.',
  },
  {
    date: '15 November 2026',
    category: 'Monthly reflection',
    title: 'Set an intention for the month',
    description: 'Choose one question you want to sit with, notice what supports your wellbeing, and pick one small step that feels realistic for you.',
  },
];


const createWhatsAppLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const getServiceInquiryLink = (serviceName) =>
  createWhatsAppLink(
    `Hi Astrobee 33, I’m interested in ${serviceName}. Could you share current availability, format, duration, and fee?`
  );

function App() {
  const [theme, setTheme] = useState('light');
  const [selectedService, setSelectedService] = useState('Astrology');
  const [clientName, setClientName] = useState('');
  const [clientQuestion, setClientQuestion] = useState('');
  const [customerReviewIndex, setCustomerReviewIndex] = useState(0);
  const isCrystalsPage = new URLSearchParams(window.location.search).get('page') === 'crystals';
  const selectedServiceDetails = services.find((service) => service.name === selectedService);
  const customerReviews = sessionReviews.map((review, index) => ({
    ...review,
    id: `review-${index}`,
  }));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!customerReviews.length) return undefined;
    const reviewTimer = window.setInterval(() => {
      setCustomerReviewIndex((current) => (current + 1) % customerReviews.length);
    }, 5000);

    return () => window.clearInterval(reviewTimer);
  }, [customerReviews.length]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const bookingMessage = [
    'Hi Astrobee 33, I’d like to ask about a consultation.',
    `Service: ${selectedService}`,
    clientName.trim() ? `Name: ${clientName.trim()}` : '',
    clientQuestion.trim() ? `What I’d like to explore: ${clientQuestion.trim()}` : '',
    'Please share current availability, format, duration, and fee.',
  ]
    .filter(Boolean)
    .join('\n');

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
          <a href={getPublicUrl('/')} aria-current={!isCrystalsPage ? 'page' : undefined}>
            Guidance
          </a>
          <a href={getPublicUrl('/?page=crystals')} aria-current={isCrystalsPage ? 'page' : undefined}>
            Crystals
          </a>
          <a href={getPublicUrl('/#booking')} className="site-nav-booking">
            Book
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
                <p className="eyebrow">Astrology · Tarot · Energy guidance</p>
                <h2>Find a little more meaning in your journey.</h2>
                <p className="lead">
                  Astrobee 33 offers astrology, tarot, chakra balancing, crystal guidance,
                  and cord cutting as reflective practices.
                </p>

                <div className="cta-row">
                  <a href="#booking" className="primary-btn">
                    Book a consultation
                  </a>
                  <a href="#services" className="secondary-btn">
                    Explore services
                  </a>
                </div>

                <ul className="benefits-list" aria-label="Guidance services">
                  {services.map((service) => (
                    <li key={service.number}>{service.name}</li>
                  ))}
                </ul>
              </div>

              <div className="hero-feature">
                <div className="feature-card feature-card-main">
                  <span className="mini-label">Meet your guide</span>
                  <h3>Meet Bhumika L. Rittimath</h3>
                  <img
                    src={profileLogo}
                    alt="Astrobee 33 profile logo"
                    className="profile-mark"
                  />
                  <p>
                    Vedic Astrology · KP Astrology · Tarot · 3 years of experience
                  </p>
                  <div className="guide-summary">
                    <p>
                      I guide people through life’s uncertainties with practical,
                      fearless and honest insights drawn from North and South Indian
                      astrological traditions.
                    </p>
                    <details>
                      <summary>Read my full introduction</summary>
                      <p>
                        I am Bhumika L. Rittimath, a practitioner of Vedic Astrology,
                        KP Astrology and Tarot, with 3 years of experience in guiding
                        people through life’s uncertainties.
                      </p>
                      <p>
                        Trained by experienced experts in both North Indian and South
                        Indian astrological traditions, I bring together different
                        perspectives to understand life’s challenges.
                      </p>
                      <p>
                        My approach is rooted in understanding karma, aligning everyday
                        actions and offering practical corrections to help mitigate
                        challenging planetary influences.
                      </p>
                      <p>
                        Alongside astrology, I also offer cord cutting and chakra
                        balancing sessions to support emotional and energetic well-being.
                      </p>
                      <p>
                        My purpose is to provide fearless, honest and clear guidance,
                        helping you find meaningful answers to your life’s questions.
                      </p>
                      <p>
                        Whether it concerns marriage, career, relationships or other
                        important life decisions, I aim to help you move forward with
                        greater clarity and confidence.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </section>

            <section className="info-strip" aria-label="Guidance practices">
              <div>
                <strong>Astrology</strong>
                <span>Explore symbolic themes, cycles, and personal questions.</span>
              </div>
              <div>
                <strong>Tarot</strong>
                <span>Use card symbolism to reflect on questions, patterns, and possible perspectives.</span>
              </div>
              <div>
                <strong>Energy practices</strong>
                <span>Explore chakra balancing, crystal guidance, and cord cutting to set intentions, find balance, and reflect on release.</span>
              </div>
            </section>

            <section id="services" className="services-section">
              <div className="section-heading">
                <p className="eyebrow">Find your focus</p>
                <h3>Guidance & practices</h3>
                <p className="section-description">
                  Explore the kind of support you are looking for. Message Astrobee 33 to
                  confirm what is included, availability, format, duration, and fee.
                </p>
              </div>

              <div className="service-grid">
                {services.map((service) => (
                  <article key={service.number} className="service-card">
                    <span className="service-number">{service.number}</span>
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                    <p className="service-focus">{service.focus}</p>
                    <a
                      href={getServiceInquiryLink(service.name)}
                      className="service-card-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask about {service.name}
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section className="how-section">
              <div className="section-heading">
                <p className="eyebrow">A simple way to begin</p>
                <h3>How a consultation starts</h3>
              </div>
              <div className="process-grid">
                <article className="process-card">
                  <span className="service-number">01</span>
                  <h4>Choose a focus</h4>
                  <p>Pick a guidance practice or share the question on your mind.</p>
                </article>
                <article className="process-card">
                  <span className="service-number">02</span>
                  <h4>Send an inquiry</h4>
                  <p>Use the form or a service link to start a WhatsApp conversation.</p>
                </article>
                <article className="process-card">
                  <span className="service-number">03</span>
                  <h4>Confirm the details</h4>
                  <p>Discuss availability, format, duration, fee, and any preparation before booking.</p>
                </article>
              </div>
            </section>

            <section id="about" className="about-section">
              <div className="about-image-wrap">
                <img src={profileLogo} alt="Astrobee 33 profile" className="about-image" />
              </div>
              <div className="about-copy">
                <p className="eyebrow">A little about Astrobee 33</p>
                <h3>Thoughtful guidance, centered on your questions.</h3>
                <p>
                  Astrobee 33 brings together astrology, tarot, chakra balancing,
                  crystal guidance, and cord cutting. These practices can offer a reflective
                  space to explore patterns, intentions, and next steps.
                </p>
                <p>
                  Connect with Bhumika Rittimath to discuss what you are looking for
                  and which approach may be a good fit.
                </p>
                <a href="#booking" className="text-link">
                  Start a conversation <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>


            <section className="testimonials-section">
              <div className="section-heading">
                <p className="eyebrow">Client experiences</p>
                <h3>Customer reviews</h3>
                <p className="section-description">
                  Shared feedback from consultation clients. Some messages were
                  translated from Kannada and lightly edited for readability.
                </p>
              </div>
              <div className="customer-review-slider" aria-live="polite">
                {customerReviews.map((review, index) => (
                  <article
                    className={`testimonial-card${index === customerReviewIndex ? ' is-active' : ''}`}
                    key={review.id}
                    aria-hidden={index !== customerReviewIndex}
                  >
                    <span className="mini-label">Client reflection</span>
                    <h4>{review.title}</h4>
                    <p>{review.text}</p>
                  </article>
                ))}
                <div className="customer-review-dots" aria-label="Choose a customer review">
                  {customerReviews.map((review, index) => (
                    <button
                      type="button"
                      key={review.id}
                      className={index === customerReviewIndex ? 'is-active' : ''}
                      aria-label={`Show customer review ${index + 1}`}
                      aria-pressed={index === customerReviewIndex}
                      onClick={() => setCustomerReviewIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section id="booking" className="booking-section">
              <div className="booking-copy">
                <p className="eyebrow">Start here</p>
                <h3>What would you like to explore?</h3>
                <p>
                  Share a little about the kind of guidance you are looking for. This
                  form does not save your details; it prepares a message for you to
                  review and send through WhatsApp.
                </p>
                <p className="booking-contact">WhatsApp Business · +91 77951 19975</p>
              </div>

              <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="consultation-service">Service of interest</label>
                <select
                  id="consultation-service"
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.number} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>

                <aside className="service-preparation" role="status" aria-live="polite">
                  <strong>Before your {selectedServiceDetails.name} session</strong>
                  <p>{selectedServiceDetails.preparation}</p>
                </aside>

                <label htmlFor="client-name">Your name (optional)</label>
                <input
                  id="client-name"
                  type="text"
                  maxLength="80"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  autoComplete="name"
                />

                <label htmlFor="client-question">What would you like to explore? (optional)</label>
                <textarea
                  id="client-question"
                  rows="4"
                  maxLength="500"
                  value={clientQuestion}
                  onChange={(event) => setClientQuestion(event.target.value)}
                />

                <a
                  href={createWhatsAppLink(bookingMessage)}
                  className="primary-btn booking-submit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue to WhatsApp
                </a>
                <p className="privacy-note">
                  Avoid entering birth details or sensitive information here. If needed,
                  share them privately with Astrobee 33 after discussing what is required.
                </p>
              </form>
            </section>

            <section className="profile-link">
              <div className="profile-socials">
                <div>
                  <span className="status-label">Instagram</span>
                  <strong>@astrobee_33</strong>
                </div>
                <div>
                  <span className="status-label">YouTube</span>
                  <a
                    href="https://youtube.com/@astrobee33-w8e?si=AdED7rKHwH5Rh7Om"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @astrobee33
                  </a>
                </div>
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

            <footer className="guidance-disclaimer">
              Spiritual practices and traditional associations are offered for reflection
              and do not guarantee outcomes or replace medical, mental-health, legal, or
              financial advice.
            </footer>

          </>
        )}
      </main>

      <footer className="site-footer">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Astrobee 33. All rights reserved.
        </p>
        <p className="footer-credit">
          Developed by Hemanth Kumar G · Skyguideastro
          <span aria-hidden="true"> · </span>
          <a href="mailto:skyguideastro@gmail.com">skyguideastro@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
