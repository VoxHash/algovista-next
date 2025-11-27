'use client';

import { Activity, ListOrdered, Route, Binary } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pill } from "./AlgoVista";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full text-slate-100 relative z-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 relative z-10">
        <IntroCard />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            href="/sorting"
            icon={ListOrdered}
            title="Sorting Algorithms"
            description="Visualize 10 different sorting algorithms including Quick Sort, Merge Sort, Bubble Sort, and more."
            count={10}
            color="indigo"
          />
          <CategoryCard
            href="/pathfinding"
            icon={Route}
            title="Pathfinding Algorithms"
            description="Explore pathfinding algorithms like Dijkstra, A*, BFS, DFS, and other graph traversal methods."
            count={10}
            color="fuchsia"
          />
          <CategoryCard
            href="/string-matching"
            icon={Binary}
            title="String Matching"
            description="Discover string matching algorithms including KMP, Rabin-Karp, Boyer-Moore, and more."
            count={10}
            color="emerald"
          />
        </div>

        <FooterCard />
      </main>
    </div>
  );
}

function IntroCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-indigo-400 drop-shadow-lg"/>
          <CardTitle className="text-indigo-100">Interactive Algorithm Playground</CardTitle>
          <Pill>Made by VoxHash</Pill>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-slate-200 leading-relaxed">
        <ul className="list-disc pl-6 space-y-1">
          <li>Real-time animations with step-by-step generators (no blocking loops).</li>
          <li>Instrumentation panel to visualize operation density and complexity at a glance.</li>
          <li>Pathfinding sandbox with clickable walls and switchable algorithms (Dijkstra, A*).</li>
          <li>KMP string matcher with live LPS table updates and match highlighting.</li>
          <li>Composable architecture ready for SSR and testability; add your own algorithms easily.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ 
  href, 
  icon: Icon, 
  title, 
  description, 
  count, 
  color 
}: { 
  href: string; 
  icon: any; 
  title: string; 
  description: string; 
  count: number; 
  color: "indigo" | "fuchsia" | "emerald";
}) {
  const colorClasses = {
    indigo: "text-indigo-400",
    fuchsia: "text-fuchsia-400",
    emerald: "text-emerald-400",
  };

  return (
    <Link href={href}>
      <Card className="h-full hover:scale-105 transition-transform cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${colorClasses[color]} drop-shadow-lg`}/>
            <CardTitle className="text-indigo-100">{title}</CardTitle>
            <Pill>{count} Algorithms</Pill>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
          <Button variant="outline" className="mt-4 w-full">
            Explore {title}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function FooterCard() {
  return (
    <Card>
      <CardContent className="py-4 text-xs text-slate-300 flex flex-wrap items-center justify-between">
        <div>
          © 2025 AlgoVista — Built with Next.js, Tailwind, Framer Motion, Recharts.
        </div>
        <div className="flex items-center gap-2">
          <a className="underline-offset-4 hover:underline hover:text-indigo-300 transition-colors" href="https://github.com/VoxHash" target="_blank" rel="noreferrer">GitHub</a>
          <a className="underline-offset-4 hover:underline hover:text-indigo-300 transition-colors" href="https://youtube.com/@VoxHash" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </CardContent>
    </Card>
  );
}

