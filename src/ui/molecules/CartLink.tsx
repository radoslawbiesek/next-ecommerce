import NextLink from "next/link";
import { cookies } from "next/headers";
import clsx from "clsx";

import { CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/services/graphql";
import { CartIcon } from "@/ui/atoms/CartIcon";

async function getCount(cartId?: number) {
  if (!cartId) {
    return 0;
  }

  const response = await executeGraphQL(CartGetByIdDocument, { id: cartId });
  if (!response.cart) {
    return 0;
  }

  return response.cart?.items.reduce((acc, item) => (acc += item.quantity), 0);
}

export async function CartLink() {
  const cartId = cookies().get("cartId")?.value;
  const count = await getCount(cartId ? parseInt(cartId) : undefined);

  return (
    <NextLink className="indicator" href="/cart">
      <CartIcon className="h-7 w-7" />
      <span className={clsx("badge indicator-item badge-sm", count > 0 && "badge-primary")}>{count}</span>
    </NextLink>
  );
}
