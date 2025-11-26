import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ru', 'pt', 'es', 'et', 'fr', 'de', 'ja', 'zh', 'ko', 'id'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) notFound();
  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

