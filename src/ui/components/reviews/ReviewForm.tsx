import clsx from "clsx";

import { Input } from "@/ui/elements/form/Input";
import { Textarea } from "@/ui/elements/form/Textarea";
import { RatingInput } from "@/ui/elements/form/RatingInput";
import { SubmitButton } from "@/ui/elements/form/SubmitButton";

type ReviewFormProps = { productId: number; className?: string; action: (formData: FormData) => void };

export function ReviewForm({ productId, className, action }: ReviewFormProps) {
  return (
    <form className={clsx("flex flex-col gap-3", className)} action={action} data-testid="add-review-form">
      <input type="hidden" name="productId" value={productId} required />
      <Input label="Review title" name="headline" required />
      <Textarea label="Review content" name="content" required />
      <RatingInput label="Rating" />
      <Input label="Name" name="name" required />
      <Input label="Email" name="email" type="email" required />
      <SubmitButton className="mt-4">Submit review</SubmitButton>
    </form>
  );
}
