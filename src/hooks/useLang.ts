'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'ru';

export const useLang = (): { lang: Language, changeLanguage: (l: Language) => void } => {
  const [lang, setLang] = useState<Language>('en');
  const changeLanguage = (lng: Language) => {
    setLang(lng)
  }
  
  useEffect(() => {
    // Function to determine the language
    const determineLanguage = (): Language => {
      // 1. Try to get language from browser
      if (typeof window !== 'undefined') {
        // Get browser language
        const browserLang = navigator.language?.split('-')[0].toLowerCase();
        if (browserLang === 'ru') {
          return 'ru';
        }
        return 'en';
      }

      // 2. Try to get language from Telegram user
      if (typeof window !== 'undefined') {
        // Telegram WebApp provides user info including language code
        // https://core.telegram.org/bots/webapps#webappuser
        const tg = (window as any).Telegram?.WebApp;
        if (tg?.initDataUnsafe?.user?.language_code) {
          const telegramLang = tg.initDataUnsafe.user.language_code.split('-')[0].toLowerCase();
          if (telegramLang === 'ru') {
            return 'ru';
          }
          return 'en';
        }
      }

      // 3. Default to English
      return 'en';
    };

    const detectedLang = determineLanguage();
    setLang(detectedLang);
  }, []);

  return { lang, changeLanguage };
};
