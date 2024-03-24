import NextLink from "next/link";

import * as cartService from "@/services/cart";
import { formatPrice } from "@/helpers/formatPrice";
import { CartListItem } from "@/ui/components/cart/CartListItem";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";

export default async function CartPage() {
  const cart = await cartService.getFromCookies();
  if (!cart?.items.length) {
    return <h1 className="my-8 text-center text-3xl font-bold">Your cart is empty</h1>;
  }
  const total = calculateCartTotal(cart);

  return (
    <section>
      <div className="flex items-start justify-center gap-8 py-8">
        <div className="card bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-3xl">Your shopping cart</h1>
            <ul className="flex flex-1 flex-col gap-2 bg-base-100">
              {cart.items.map((item, index) => (
                <>
                  {index !== 0 && <div className="divider" />}
                  <CartListItem key={item.id} {...item} />
                </>
              ))}
            </ul>
          </div>
        </div>

        <div className="card w-full max-w-96 bg-base-100 lg:card-side">
          <div className="card-body">
            <h2 className="card-title">Summary</h2>
            <div className="flex flex-row justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>{formatPrice(total / 100)}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-semibold">Shipping</span>
              <span>Free</span>
            </div>
            <div className="divider" />
            <div className="flex flex-row justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">{formatPrice(total / 100)}</span>
            </div>
            <NextLink href="/cart/payment" className="btn btn-primary mt-8 w-full">
              Checkout
            </NextLink>
            <NextLink href="/products" className="btn btn-outline mt-2">
              Continue shopping
            </NextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
