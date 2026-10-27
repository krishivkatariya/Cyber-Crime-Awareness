// Temporary bilingual copy lives here so it can be reviewed and replaced
// without changing the layout components.
const content = {
  siteTitle: {
    gu: 'સાયબર સુરક્ષા જાગૃતિ',
    en: 'Cybersecurity Awareness',
  },
  siteTagline: {
    gu: 'સુરક્ષિત ડિજિટલ જીવન માટે જાગૃતિ',
    en: 'Awareness for safer digital lives',
  },
  navigationLabel: {
    gu: 'મુખ્ય નેવિગેશન',
    en: 'Main navigation',
  },
  navLinks: [
    { id: 'home', label: { gu: 'મુખ્ય પૃષ્ઠ', en: 'Home' } },
    { id: 'awareness', label: { gu: 'જાગૃતિ', en: 'Awareness' } },
  ],
  hero: {
    headline: {
      gu: 'સુરક્ષિત ડિજિટલ જીવન માટે સાવચેતી જરૂરી',
      en: 'Build safer habits for life online',
    },
    subhead: {
      gu: 'ઓનલાઇન સાવચેતી રાખવી, વ્યક્તિગત માહિતીનું રક્ષણ કરવું અને શંકાસ્પદ સંદેશાઓને ઓળખવું—આ સરળ પગલાં ડિજિટલ જીવનને વધુ સુરક્ષિત બનાવવામાં મદદ કરે છે.',
      en: 'Protecting personal information, pausing before you respond, and spotting suspicious messages are simple steps that can help make everyday digital life safer.',
    },
    ctaPrimary: {
      gu: 'જાગૃતિ સંદેશ વાંચો',
      en: 'Read the awareness message',
    },
    visualCaption: {
      gu: 'સાવચેતીથી સુરક્ષા',
      en: 'Protection through awareness',
    },
  },
  translationNote: {
    gu: 'ગુજરાતી લખાણ કામચલાઉ છે અને સમીક્ષા માટે બાકી છે.',
    en: 'The Gujarati copy is temporary and awaiting review.',
  },
  skipLink: {
    gu: 'મુખ્ય સામગ્રી પર જાઓ',
    en: 'Skip to main content',
  },
  menuButton: {
    gu: 'મેનુ ખોલો',
    en: 'Open menu',
  },
  closeMenu: {
    gu: 'મેનુ બંધ કરો',
    en: 'Close menu',
  },
  menuText: {
    gu: 'મેનુ',
    en: 'Menu',
  },
  switchLanguage: {
    gu: 'ભાષા બદલો: અંગ્રેજી',
    en: 'Switch language to Gujarati',
  },
  languageName: {
    gu: 'ગુજરાતી',
    en: 'English',
  },
  documentTitle: {
    gu: 'સાયબર સુરક્ષા જાગૃતિ',
    en: 'Cybersecurity Awareness',
  },
  metaDescription: {
    gu: 'સાયબર સુરક્ષા અને સુરક્ષિત ડિજિટલ આદતો વિશે જાગૃતિ.',
    en: 'Cybersecurity awareness and guidance for safer digital habits.',
  },
};

export function t(path, language) {
  const value = path.split('.').reduce((entry, key) => entry?.[key], content);
  if (value && typeof value === 'object') {
    return value[language] ?? value.en ?? path;
  }
  return typeof value === 'string' ? value : path;
}

export function getNavLinks(language) {
  return content.navLinks.map(({ id, label }) => ({
    id,
    label: label[language] ?? label.en,
  }));
}
