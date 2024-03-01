"use client";

import { useFormStatus } from "react-dom";

export function AddToCartButton() {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-neutral mt-2 w-full max-w-xs disabled:cursor-wait"
      disabled={status.pending}
      data-testid="add-to-cart-button"
    >
      {status.pending ? <span className="loading loading-spinner"></span> : null}
      Add to cart
    </button>
  );
}
