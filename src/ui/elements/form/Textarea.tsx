import { FormControl } from "./FormControl";

type TextareaProps = React.ComponentProps<"textarea"> & { label?: string };

export function Textarea({ label, ...props }: TextareaProps) {
  return (
    <FormControl label={label}>
      <textarea className="textarea textarea-bordered h-24" {...props}></textarea>
    </FormControl>
  );
}
