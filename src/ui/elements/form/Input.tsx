import clsx from "clsx";
import { FormControl } from "./FormControl";

type InputProps = React.ComponentProps<"input"> & { label?: string; wrapperClassName?: string };

export function Input({ label, wrapperClassName, className, ...props }: InputProps) {
  return (
    <FormControl label={label} className={wrapperClassName}>
      <input className={clsx("input input-bordered", className)} {...props} />
    </FormControl>
  );
}
