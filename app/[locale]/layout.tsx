import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import HtmlLangSetter from '@/components/HtmlLangSetter';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlgoVista — Algorithm Visualizer",
  description: "Interactive visualizer by VoxHash",
};

// Disable static generation - routes generated on-demand by middleware
export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  // Load messages directly from locale parameter
  // With localePrefix never, we can't rely on getMessages() context
  let messages;
  try {
    const messagesModule = await import(`@/messages/${locale}.json`);
    messages = messagesModule.default || messagesModule;
  } catch (error) {
    // If import fails, try to load default English messages
    try {
      const fallbackModule = await import(`@/messages/en.json`);
      messages = fallbackModule.default || fallbackModule;
    } catch (fallbackError) {
      // If both fail, use empty messages
      console.error(`Failed to load messages for locale ${locale}:`, error);
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HtmlLangSetter />
      {children}
    </NextIntlClientProvider>
  );
}

