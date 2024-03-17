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
    <div>
      <h3 className="mb-4 mt-10 text-center text-2xl font-bold">Our top products</h3>
      <ul
        data-testid="products-list"
        className={clsx("flex h-full flex-wrap items-center justify-center gap-8", className)}
      >
        {topProducts.map((product) => (
          <ProductListItem key={product.id} {...product} className="w-60" />
        ))}
      </ul>
    </div>
  );
}
