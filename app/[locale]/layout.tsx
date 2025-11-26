import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlgoVista — Algorithm Visualizer",
  description: "Interactive visualizer by VoxHash",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering - routes generated on-demand
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

