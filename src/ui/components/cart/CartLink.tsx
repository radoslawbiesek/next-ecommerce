import NextLink from "next/link";
import clsx from "clsx";

import { CartIcon } from "@/ui/elements/icons/CartIcon";
import * as cartService from "@/services/cart";

export async function CartLink() {
  const cart = await cartService.getFromCookies();
  const count = cart ? cart.items.reduce((acc, item) => (acc += item.quantity), 0) : 0;

  return (
    <NextLink className="indicator" href="/cart">
      <CartIcon className="h-7 w-7" />
      <span className={clsx("badge indicator-item badge-sm", count > 0 && "badge-primary")}>{count}</span>
    </NextLink>
  );
}
