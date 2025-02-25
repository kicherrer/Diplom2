'use client';

import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className="w-[40px]"
    >
      {i18n.language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
}
