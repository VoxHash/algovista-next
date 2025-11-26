'use client';

import AlgoVista from "@/components/AlgoVista";

// Disable static generation for this page to avoid prerender errors
// With localePrefix 'never', routes are generated on-demand by middleware
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <AlgoVista />;
}

