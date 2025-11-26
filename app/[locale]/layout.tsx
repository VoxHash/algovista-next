import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlgoVista — Algorithm Visualizer",
  description: "Interactive visualizer by VoxHash",
};

// Disable static generation - routes generated on-demand by middleware
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  // With localePrefix never, getMessages() may not have locale context
  // So we load messages directly based on the locale from params
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    // If import fails, try getMessages as fallback
    try {
      messages = await getMessages();
    } catch (getMessagesError) {
      // If both fail, use empty messages
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

