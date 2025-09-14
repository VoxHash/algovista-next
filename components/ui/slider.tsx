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
      className="w-full accent-indigo-500"
      aria-label="slider"
    />
  );
}
