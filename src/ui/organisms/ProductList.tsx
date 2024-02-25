import "server-only";

import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListProps = {
  products: ProductListItemFragment[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <ul data-testid="products-list" className="flex h-full flex-wrap items-center justify-center gap-8">
      {products.map((product) => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </ul>
  );
}
