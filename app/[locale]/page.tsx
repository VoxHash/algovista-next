import AlgoVista from "@/components/AlgoVista";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page() {
  return <AlgoVista />;
}

