import "server-only";
import clsx from "clsx";

import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListProps = {
  products: ProductListItemFragment[];
  className?: string;
};

export function ProductList({ products, className }: ProductListProps) {
  return (
    <ul
      data-testid="products-list"
      className={clsx("flex h-full flex-wrap items-center justify-center gap-8", className)}
    >
      {products.map((product) => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </ul>
  );
}
