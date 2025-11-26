'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const switchLanguage = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
    
    // Handle 'as-needed' locale prefix strategy
    // Default locale (en) has no prefix, others do
    const defaultLocale = 'en';
    let newPath: string;
    
    if (locale === defaultLocale) {
      // Currently on default locale (no prefix)
      if (newLocale === defaultLocale) {
        newPath = pathname; // Stay on same path
      } else {
        // Switch to non-default locale: add prefix
        newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
      }
    } else {
      // Currently on non-default locale (has prefix)
      if (newLocale === defaultLocale) {
        // Switch to default locale: remove prefix
        newPath = pathname.replace(`/${locale}`, '') || '/';
      } else {
        // Switch between non-default locales: replace prefix
        newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      }
    }
    
    router.push(newPath as any);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
      </Button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-lg z-50 border border-white/10 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
                  locale === lang.code ? 'bg-indigo-600/30' : ''
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

