import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

i18n
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n to react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
