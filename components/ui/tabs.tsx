'use client';
import * as React from "react";

export function Tabs({ value, onValueChange, children }: any) {
  return <div data-value={value} data-onchange onChange={()=>{}}>{React.Children.map(children, (c:any)=>React.cloneElement(c, {value, onValueChange}))}</div>;
}
export function TabsList({ children }: any){ return <div className="inline-flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1">{children}</div>; }
export function TabsTrigger({ value: triggerValue, children, value, onValueChange }: any){
  const active = triggerValue===value;
  return <button onClick={()=>onValueChange(triggerValue)} className={`px-3 py-1.5 rounded-lg text-sm border ${active?'bg-indigo-600/80 text-white border-indigo-500/40':'bg-transparent text-slate-200 border-transparent hover:bg-slate-800/60'}`}>{children}</button>;
}
export function TabsContent({ children }: any){ return <div className="mt-2">{children}</div>; }
