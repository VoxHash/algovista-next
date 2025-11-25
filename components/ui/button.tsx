import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default"|"secondary"|"outline"|"ghost"; size?: "sm"|"md"|"icon" };
export function Button({ className, variant="default", size="md", ...props }: Props) {
  const base = "rounded-xl border transition-all duration-200 px-3 py-2 backdrop-blur-sm";
  const variants = {
    default: "bg-indigo-600/70 hover:bg-indigo-600/90 text-white border-indigo-400/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30",
    secondary: "bg-slate-800/60 hover:bg-slate-700/70 text-slate-100 border-white/10 shadow-md",
    outline: "bg-white/5 hover:bg-white/10 text-slate-100 border-white/20 hover:border-white/30 shadow-sm",
    ghost: "bg-transparent hover:bg-white/5 text-slate-200 border-transparent hover:border-white/10"
  }[variant];
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-sm px-3 py-2", icon:"p-2" }[size];
  return <button className={clsx(base, variants, sizes, className)} {...props} />;
}
export default Button;
