import HomePage from "@/components/HomePage";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function Page() {
  return (
    <div className="min-h-screen w-full text-slate-100 relative z-10">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Navigation />
      </div>
      <HomePage />
    </div>
  );
}
