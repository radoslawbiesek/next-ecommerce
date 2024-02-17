import { Suspense } from "react";

import { ProductList } from "@/ui/organisms/ProductList";
import { ProductsPagination } from "@/ui/organisms/ProductsPagination";
import * as productsService from "@/services/products";
import { range } from "@/helpers/range";

export const metadata = {
  title: "Products - Shop",
};

const PRODUCTS_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

export function generateStaticParams() {
  return range(1, 3).map((pageNumber) => ({ pageNumber: pageNumber.toString() }));
}

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
  const page = !isNaN(parseInt(params.pageNumber)) ? parseInt(params.pageNumber) : DEFAULT_PAGE;
  const products = await productsService.getAll(PRODUCTS_PER_PAGE, (page - 1) * PRODUCTS_PER_PAGE);

  return (
    <section className="h-full">
      <ProductList products={products} />
      <Suspense>
        <ProductsPagination page={page} perPage={PRODUCTS_PER_PAGE} />
      </Suspense>
    </section>
  );
}
