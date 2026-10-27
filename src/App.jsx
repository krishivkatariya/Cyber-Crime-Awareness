import { useEffect, useRef, useState } from 'react';
import { t, getNavLinks } from './content.js';
import './App.css';

const DEFAULT_LANGUAGE = 'gu';
const SUPPORTED_LANGUAGES = ['gu', 'en'];

function LanguageToggle({ language, onChange }) {
  const nextLanguage = language === 'gu' ? 'en' : 'gu';

  return (
    <button
      type="button"
      className="language-toggle"
      aria-label={t('switchLanguage', language)}
      onClick={() => onChange(nextLanguage)}
    >
      {t('languageName', nextLanguage)}
    </button>
  );
}

function SiteHeader({ language, onLanguageChange, navLinks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        {t('skipLink', language)}
      </a>

      <div className="header-inner">
        <a href="#home" className="site-identity" aria-label={t('siteTitle', language)}>
          <span className="site-mark" aria-hidden="true">
            <svg viewBox="0 0 32 36" focusable="false">
              <path d="M16 2 29 7v9c0 8-5.3 14.2-13 18C8.3 30.2 3 24 3 16V7l13-5Z" />
              <path d="m10 17 4 4 8-9" />
            </svg>
          </span>
          <span className="site-identity__text">
            <span className="site-title">{t('siteTitle', language)}</span>
            <span className="site-tagline">{t('siteTagline', language)}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label={t('navigationLabel', language)}>
          <button
            type="button"
            className="menu-toggle"
            ref={menuToggleRef}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            aria-label={
              isMenuOpen
                ? t('closeMenu', language)
                : t('menuButton', language)
            }
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="menu-toggle__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{t('menuText', language)}</span>
          </button>

          <ul
            id="primary-menu"
            className={`nav-list${isMenuOpen ? ' is-open' : ''}`}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="nav-link"
                  href={`#${link.id}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (menuToggleRef.current?.offsetParent !== null) {
                      menuToggleRef.current?.focus();
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-language">
              <LanguageToggle
                language={language}
                onChange={onLanguageChange}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function HeroSection({ language }) {
  return (
    <main className="main-content" id="main-content">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t('siteTagline', language)}</p>
            <h1 className="hero-headline" id="hero-title">
              {t('hero.headline', language)}
            </h1>
            <p className="hero-subhead" id="awareness">
              {t('hero.subhead', language)}
            </p>
            <p className="translation-note">
              {t('translationNote', language)}
            </p>
            <a className="button button-primary" href="#awareness">
              {t('hero.ctaPrimary', language)}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__orbit hero-art__orbit--outer" />
            <div className="hero-art__orbit hero-art__orbit--inner" />
            <span className="hero-art__node hero-art__node--top" />
            <span className="hero-art__node hero-art__node--right" />
            <span className="hero-art__node hero-art__node--left" />
            <div className="hero-art__shield">
              <svg viewBox="0 0 112 128" focusable="false">
                <path d="M56 5 103 23v34c0 29-19 52-47 66C28 109 9 86 9 57V23L56 5Z" />
                <path d="m35 63 14 14 29-32" />
              </svg>
            </div>
            <span className="hero-art__caption">
              {t('hero.visualCaption', language)}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem('cybercrime-lang');
    return SUPPORTED_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    window.localStorage.setItem('cybercrime-lang', language);
    document.documentElement.lang = language;
    document.title = t('documentTitle', language);

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t('metaDescription', language));
    }
  }, [language]);

  const navLinks = getNavLinks(language);

  return (
    <div className="app" lang={language}>
      <SiteHeader
        language={language}
        onLanguageChange={setLanguage}
        navLinks={navLinks}
      />
      <HeroSection language={language} />
    </div>
  );
}

export default App;
