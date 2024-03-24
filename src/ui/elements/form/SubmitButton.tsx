"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { Spinner } from "@/ui/elements/form/Spinner";

type SubmitButtonProps = { children: React.ReactNode; className?: string } & React.ComponentProps<"button">;

export function SubmitButton({ children, className, ...rest }: SubmitButtonProps) {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx("btn btn-primary mt-2 w-full max-w-xs disabled:cursor-wait", className)}
      disabled={status.pending}
      {...rest}
    >
      {status.pending ? <Spinner /> : null}
      {children}
    </button>
  );
}
