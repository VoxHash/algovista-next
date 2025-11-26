'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function HtmlLangSetter() {
  const locale = useLocale();
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
    }
  }, [locale]);
  
  return null;
}

