import * as React from "react";
export function Label({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  return <label className={"text-slate-300 "+(className||"")} {...props} />;
}
