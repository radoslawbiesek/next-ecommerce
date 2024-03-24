import "server-only";
import clsx from "clsx";

import { ProductListItem } from "@/ui/components/products/ProductListItem";
import * as productsService from "@/services/products";
import { PRODUCTS_PER_PAGE } from "@/contants";

type TopProductsProps = {
  productId?: number;
  className?: string;
};

export async function TopProducts({ className }: TopProductsProps) {
  const { data: topProducts } = await productsService.getAll({ take: PRODUCTS_PER_PAGE, ordering: "-rating" });

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <h3 className="text-center text-2xl font-bold">Top products</h3>
      <ul data-testid="products-list" className="flex h-full flex-wrap items-center justify-center gap-8">
        {topProducts.map((product) => (
          <ProductListItem key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
}
