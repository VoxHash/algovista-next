import AlgoVista from "@/components/AlgoVista";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Disable static prerendering - let middleware handle routing
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <AlgoVista />;
}

