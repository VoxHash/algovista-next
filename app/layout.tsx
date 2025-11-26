import './globals.css';
import HtmlLangSetter from '@/components/HtmlLangSetter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HtmlLangSetter />
        {children}
      </body>
    </html>
  );
}

