import "server-only";

import { type ProductItem } from "@/ui/types";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = {
  products: ProductItem[];
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
