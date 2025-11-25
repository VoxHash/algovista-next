'use client';
import * as React from "react";
export function TooltipProvider({ children }: any){ return children; }
export function Tooltip({ children }: any){ return children; }
export function TooltipTrigger({ children, asChild }: any){ return asChild ? children : <span>{children}</span>; }
export function TooltipContent({ children }: any){ return <span className="sr-only">{children}</span>; }
