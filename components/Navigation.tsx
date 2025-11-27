'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListOrdered, Route, Binary, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sorting", label: "Sorting", icon: ListOrdered },
    { href: "/pathfinding", label: "Pathfinding", icon: Route },
    { href: "/string-matching", label: "String Matching", icon: Binary },
  ];

  return (
    <nav className="glass-light rounded-xl p-2 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex items-center gap-2",
                  isActive && "bg-indigo-600/70 text-white"
                )}
              >
                <Icon className="h-4 w-4"/>
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

