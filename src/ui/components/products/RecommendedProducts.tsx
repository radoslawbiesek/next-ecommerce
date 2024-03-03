import "server-only";
import clsx from "clsx";

import { ProductListItem } from "@/ui/components/products/ProductListItem";
import * as productsService from "@/services/products";
import { PRODUCTS_PER_PAGE } from "@/contants";

type RecommendedProductsProps = {
  productId: number;
  className?: string;
};

export async function RecommendedProducts({ productId, className }: RecommendedProductsProps) {
  const recommendedProducts = await productsService.getRecommendedProducts(productId, { take: PRODUCTS_PER_PAGE });
  return (
    <div>
      <h3 className="mb-4 mt-10 text-center text-2xl font-bold">You may also like</h3>
      <ul
        data-testid="related-products"
        className={clsx("flex h-full flex-wrap items-center justify-center gap-8", className)}
      >
        {recommendedProducts.map((product) => (
          <ProductListItem key={product.id} {...product} className="w-60" />
        ))}
      </ul>
    </div>
  );
}
