import { cookies } from "next/headers";
import NextImage from "next/image";
import NextLink from "next/link";

import * as cartService from "@/services/cart";
import { formatPrice } from "@/helpers/formatPrice";
import { ChangeCartItemQuantity } from "@/ui/components/cart/ChangeCartItemQuantity";
import { RemoveCartItemButtom } from "@/ui/components/cart/RemoveCartItemButtom";

export default async function CartPage() {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return <p>Your cart is empty</p>;
  }

  const cart = await cartService.getById(parseInt(cartId));

  if (!cart?.items.length) {
    return <h1 className="my-8 text-center text-3xl font-bold">Your cart is empty</h1>;
  }

  const total = cart.items.reduce((acc, item) => (acc += item.quantity * item.product.price), 0);

  return (
    <>
      <h1 className="text-3xl font-bold">Your shopping cart</h1>
      <div className="flex items-start gap-8">
        <ul className="mt-8 flex flex-1 flex-col gap-2">
          {cart.items.map(({ id, product, variant, quantity, productId }, index) => (
            <li key={`${productId}-${variant}`}>
              {index !== 0 && <div className="divider" />}
              <div className="card lg:card-side">
                {product.images[0] && (
                  <figure>
                    <NextImage
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      width={120}
                      height={120}
                    />
                  </figure>
                )}
                <div className="card-body flex flex-row items-center gap-8">
                  <div className="flex-1">
                    <NextLink href={`/product/${product.slug}`}>
                      <h2 className="card-title">{product.name}</h2>
                      <p>{variant}</p>
                    </NextLink>
                  </div>
                  <ChangeCartItemQuantity cartItemId={id} quantity={quantity} />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-semibold">{formatPrice((quantity * product.price) / 100)}</span>
                    <span className="text-sm italic">{formatPrice(product.price / 100)} per item</span>
                  </div>
                  <RemoveCartItemButtom cartItemId={id} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="card w-full max-w-96 bg-base-200 lg:card-side">
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
            <button className="btn btn-primary mt-8 w-full">Checkout</button>
            <NextLink href="/products" className="btn btn-outline mt-2">
              Continue shopping
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
}
