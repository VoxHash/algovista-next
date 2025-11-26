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

  // Use try-catch for getMessages in case of build-time issues
  // With localePrefix never, getMessages should get locale from middleware context
  let messages;
  try {
    // Try to get messages - if it fails, fallback to empty
    messages = await getMessages();
  } catch (error) {
    // If getMessages fails, try to load messages directly
    try {
      messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (importError) {
      // If import also fails, use empty messages
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

