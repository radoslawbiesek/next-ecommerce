"use client";

import { useFormStatus } from "react-dom";

import { TrashIcon } from "@/ui/elements/icons/TrashIcon";

import * as cartActions from "@/actions/cart";

export function RemoveCartItemButtom({ cartItemId }: { cartItemId: number }) {
  const status = useFormStatus();

  return (
    <form
      action={async () => {
        await cartActions.removeItem(cartItemId);
      }}
    >
      <button className="btn btn-circle btn-ghost" type="submit" disabled={status.pending}>
        {status.pending ? <span className="loading loading-spinner"></span> : <TrashIcon />}
      </button>
    </form>
  );
}
