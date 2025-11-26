'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HtmlLangSetter() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
    }
  }, [locale, pathname]);
  
  return null;
}

