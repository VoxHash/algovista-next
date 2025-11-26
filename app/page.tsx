import { redirect } from 'next/navigation';

export default function RootPage() {
  // With localePrefix 'never', middleware will handle locale detection
  // Redirect to default locale route (internally, not in URL)
  redirect('/en');
}

