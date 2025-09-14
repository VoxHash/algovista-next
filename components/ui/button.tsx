import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default"|"secondary"|"outline"|"ghost"; size?: "sm"|"md"|"icon" };
export function Button({ className, variant="default", size="md", ...props }: Props) {
  const base = "rounded-2xl border transition px-3 py-2";
  const variants = {
    default: "bg-indigo-600/80 hover:bg-indigo-600 text-white border-indigo-500/40 shadow",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700",
    outline: "bg-transparent text-slate-100 border-slate-700 hover:bg-slate-800/50",
    ghost: "bg-transparent text-slate-200 border-transparent hover:bg-slate-800/50"
  }[variant];
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-sm px-3 py-2", icon:"p-2" }[size];
  return <button className={clsx(base, variants, sizes, className)} {...props} />;
}
export default Button;
