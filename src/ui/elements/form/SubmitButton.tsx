"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";

type SubmitButtonProps = { children: React.ReactNode; className?: string } & React.ComponentProps<"button">;

export function SubmitButton({ children, className, ...rest }: SubmitButtonProps) {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx("btn btn-neutral mt-2 w-full max-w-xs disabled:cursor-wait", className)}
      disabled={status.pending}
      {...rest}
    >
      {status.pending ? <span className="loading loading-spinner"></span> : null}
      {children}
    </button>
  );
}
