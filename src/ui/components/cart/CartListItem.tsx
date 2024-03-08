import NextImage from "next/image";
import NextLink from "next/link";

import { ChangeCartItemQuantity } from "@/ui/components/cart/ChangeCartItemQuantity";
import { formatPrice } from "@/helpers/formatPrice";
import { RemoveCartItemButtom } from "@/ui/components/cart/RemoveCartItemButtom";
import { type CartItemFragment } from "@/gql/graphql";

export function CartListItem({ product, productId, variant, quantity, id }: CartItemFragment) {
  return (
    <li key={`${productId}-${variant}`}>
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
  );
}
