import AlgoVista from "@/components/AlgoVista";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
export const revalidate = false;

export default function Page() {
  return <AlgoVista />;
}

