"use client";

import { useFormStatus } from "react-dom";

import { TrashIcon } from "@/ui/elements/icons/TrashIcon";

import * as cartActions from "@/actions/cart";
import { Spinner } from "@/ui/elements/form/Spinner";

export function RemoveCartItemButtom({ cartItemId }: { cartItemId: number }) {
  const status = useFormStatus();

  return (
    <form
      action={async () => {
        await cartActions.removeItem(cartItemId);
      }}
    >
      <button className="btn btn-circle btn-ghost" type="submit" disabled={status.pending}>
        {status.pending ? <Spinner /> : <TrashIcon />}
      </button>
    </form>
  );
}
