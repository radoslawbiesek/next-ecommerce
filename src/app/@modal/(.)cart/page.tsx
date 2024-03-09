import clsx from "clsx";

import * as cartService from "@/services/cart";
import { Overlay } from "@/ui/components/cart/Overlay";
import { CartListItemCompact } from "@/ui/components/cart/CartListItemCompact";
import { formatPrice } from "@/helpers/formatPrice";
import { ContinueShoppingButton } from "@/ui/components/cart/ContinueShoppingButton";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";

export default async function ModalCart() {
  const cart = await cartService.getFromCookies();
  const total = calculateCartTotal(cart);

  return (
    <aside className="animation-fade-in fixed inset-0 z-20 backdrop-blur-sm">
      <Overlay />
      <div className="animation-slide-from-right absolute bottom-0 right-0 top-0 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between bg-base-200 p-6">
          <h1 className="text-3xl font-bold">Your shopping cart</h1>
        </div>
        <ul className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {cart?.items.length ? (
            cart.items.map((item, index) => (
              <CartListItemCompact key={item.id} {...item} className={clsx({ "border-t": index !== 0 })} />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>
        <div className="flex flex-col gap-3 bg-base-200 p-6">
          <div className="flex flex-row justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">{formatPrice(total / 100)}</span>
          </div>
          <a
            href="/cart/payment"
            className={clsx("btn btn-primary", {
              "pointer-events-none": !cart?.items.length,
              "cursor-default": !cart?.items.length,
            })}
          >
            Checkout
          </a>
          <div className="flex gap-2">
            <a className="btn btn-neutral flex-1" href="/cart">
              Go to cart
            </a>
            <ContinueShoppingButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
