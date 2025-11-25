'use client';
import * as React from "react";
type Props = { value: number[]; min?: number; max?: number; step?: number; onValueChange: (v:number[])=>void };
export function Slider({ value, min=0, max=100, step=1, onValueChange }: Props) {
  const v = value?.[0] ?? 0;
  return (
    <input
      type="range"
      value={v}
      min={min}
      max={max}
      step={step}
      onChange={(e)=>onValueChange([Number(e.target.value)])}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
      style={{
        background: `linear-gradient(to right, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0.6) ${(v - min) / (max - min) * 100}%, rgba(255, 255, 255, 0.1) ${(v - min) / (max - min) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
      }}
      aria-label="slider"
    />
  );
}
