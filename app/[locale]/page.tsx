import AlgoVista from "@/components/AlgoVista";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering - routes generated on-demand
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <AlgoVista />;
}

