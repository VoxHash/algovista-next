'use client';
import * as React from "react";

export function Tabs({ value, onValueChange, children }: any) {
  return <div data-value={value} data-onchange onChange={()=>{}}>{React.Children.map(children, (c:any)=>React.cloneElement(c, {value, onValueChange}))}</div>;
}
export function TabsList({ children, className }: any){ 
  return (
    <div className={`inline-flex items-center gap-1 glass-light rounded-xl p-1 overflow-x-auto ${className || ''}`}>
      {children}
    </div>
  ); 
}
export function TabsTrigger({ value: triggerValue, children, value, onValueChange, disabled, className }: any){
  const active = triggerValue===value;
  return (
    <button 
      onClick={()=>!disabled && onValueChange && onValueChange(triggerValue)} 
      disabled={disabled}
      className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 backdrop-blur-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent active:scale-95 ${
        active
          ? 'bg-indigo-600/70 text-white border-indigo-400/30 shadow-lg shadow-indigo-500/20 hover:bg-indigo-600/80'
          : 'bg-transparent text-slate-200 border-transparent hover:bg-white/5 hover:border-white/10 hover:scale-105'
      } ${className || ''}`}
    >
      {children}
    </button>
  );
}
export function TabsContent({ children }: any){ return <div className="mt-2">{children}</div>; }
