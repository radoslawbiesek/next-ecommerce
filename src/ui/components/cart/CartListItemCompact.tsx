import NextImage from "next/image";
import NextLink from "next/link";

import { formatPrice } from "@/helpers/formatPrice";
import { type CartItemFragment } from "@/gql/graphql";

type CartListItemCompactProps = CartItemFragment & { className: string };

export function CartListItemCompact({ product, productId, variant, quantity, className }: CartListItemCompactProps) {
  return (
    <li key={`${productId}-${variant}`} className={className}>
      <div className="card lg:card-side">
        {product.images[0] && (
          <figure>
            <NextImage src={product.images[0].url} alt={product.images[0].alt || product.name} width={80} height={80} />
          </figure>
        )}
        <div className="card-body flex flex-row items-center">
          <div className="flex-1">
            <NextLink href={`/product/${product.slug}`}>
              <h2 className="card-title">{product.name}</h2>
              <p>{variant}</p>
              <p className="mt-2">
                <span className="font-bold">Quantity: </span>
                {quantity}
              </p>
            </NextLink>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">{formatPrice((quantity * product.price) / 100)}</span>
            <span className="text-sm italic">{formatPrice(product.price / 100)} per item</span>
          </div>
        </div>
      </div>
    </li>
  );
}
