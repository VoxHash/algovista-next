'use client';

import { Cpu, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pill } from "./AlgoVista";
import Link from "next/link";

export default function Header() {
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Cpu className="h-5 w-5 text-fuchsia-400 drop-shadow-lg flex-shrink-0"/>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent truncate">AlgoVista — Algorithm Visualizer</h1>
          </Link>
          <Pill className="hidden sm:inline-flex flex-shrink-0">{formattedDate}</Pill>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="https://voxhash.dev/" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Portfolio</Button>
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/VoxHash/algovista-next" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" aria-label="View Source Code">
                    <Code2 className="h-4 w-4"/>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>View Source Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}

