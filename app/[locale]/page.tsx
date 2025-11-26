import AlgoVista from "@/components/AlgoVista";

// Force dynamic rendering - routes generated on-demand
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <AlgoVista />;
}

