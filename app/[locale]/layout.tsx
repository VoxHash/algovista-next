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
  // Explicitly pass locale to getMessages to ensure it works with localePrefix never
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    // If getMessages fails during build, use empty messages
    messages = {};
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

