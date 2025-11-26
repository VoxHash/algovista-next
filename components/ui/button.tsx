import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "default"|"secondary"|"outline"|"ghost"; 
  size?: "sm"|"md"|"icon";
  isLoading?: boolean;
};

export function Button({ 
  className, 
  variant="default", 
  size="md", 
  isLoading = false,
  disabled,
  children,
  ...props 
}: Props) {
  const base = "rounded-xl border transition-all duration-200 px-3 py-2 backdrop-blur-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none active:scale-95";
  const variants = {
    default: "bg-indigo-600/70 hover:bg-indigo-600/90 text-white border-indigo-400/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-105 focus:ring-indigo-500",
    secondary: "bg-slate-800/60 hover:bg-slate-700/70 text-slate-100 border-white/10 shadow-md hover:scale-105 focus:ring-slate-500",
    outline: "bg-white/5 hover:bg-white/10 text-slate-100 border-white/20 hover:border-white/30 shadow-sm hover:scale-105 focus:ring-white/20",
    ghost: "bg-transparent hover:bg-white/5 text-slate-200 border-transparent hover:border-white/10 hover:scale-105 focus:ring-white/10"
  }[variant];
  const sizes = { 
    sm: "text-sm px-3 py-1.5 min-h-[32px]", 
    md: "text-sm px-4 py-2 min-h-[40px]", 
    icon: "p-2 min-w-[40px] min-h-[40px]"
  }[size];
  
  return (
    <button 
      className={clsx(base, variants, sizes, className)} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </span>
      ) : children}
    </button>
  );
}
export default Button;
