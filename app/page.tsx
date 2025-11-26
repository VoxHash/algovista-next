import { redirect } from 'next/navigation';

// Root page redirects to default locale
// With localePrefix 'as-needed', /en will show as / in URL
export default function RootPage() {
  redirect('/en');
}

