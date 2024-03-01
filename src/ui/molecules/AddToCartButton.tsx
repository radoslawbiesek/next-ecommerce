"use client";

import { useFormStatus } from "react-dom";

export async function AddToCartButton() {
  const status = useFormStatus();

  if (status.pending) {
    return null;
  }

  return (
    <button
      type="submit"
      className="btn btn-neutral mt-2 w-full max-w-xs disabled:cursor-wait"
      disabled={status.pending}
    >
      Add to cart
    </button>
  );
}
