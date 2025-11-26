import './globals.css';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';
  
  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}

