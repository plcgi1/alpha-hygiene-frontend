import { useEffect, useState } from 'react';
import { TelegramWebviewProxy } from '@telegram-apps/sdk';

interface TelegramHookReturn {
  isTwa: boolean;
  tg: any;
  user: any;
}

const tgAuthKey = import.meta.env.VITE_TG_AUTH_KEY
export const initUserAuthData = window.Telegram?.WebApp?.initData || tgAuthKey || '';

export function useTelegram(): TelegramHookReturn {
  const [isTwa, setIsTwa] = useState(false);
  const [tg, setTg] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if we're in Telegram Web App
    const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp;
    
    setIsTwa(!!isTelegram);

    if (isTelegram) {
      const webApp = window.Telegram.WebApp;
      
      // Initialize Telegram Web App
      webApp.ready();
      webApp.expand();

      // Set up main button
      webApp.MainButton.setParams({
        text: 'Start Analysis',
        color: '#3b82f6',
        text_color: '#ffffff',
        is_visible: false,
      });

      setTg(webApp);
      
      // Get user data from initData
      if (webApp.initData) {
        try {
          const params = new URLSearchParams(webApp.initData);
          const userData = params.get('user');
          
          if (userData) {
            setUser(JSON.parse(userData));
          }
          console.info('userData', user)
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }, []);

  return { isTwa, tg, user };
}
