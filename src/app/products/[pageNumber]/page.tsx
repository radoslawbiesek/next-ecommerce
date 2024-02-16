import { Suspense } from "react";

import { ProductList } from "@/ui/organisms/ProductList";
import { ProductsPagination } from "@/ui/organisms/ProductsPagination";
import * as productsService from "@/services/products";
import { range } from "@/helpers/range";

const PRODUCTS_PER_PAGE = 20;

export function generateStaticParams() {
  return range(1, 3).map((pageNumber) => ({ pageNumber: pageNumber.toString() }));
}

export default async function Products({ params }: { params: { pageNumber: string } }) {
  const page = !isNaN(parseInt(params.pageNumber)) ? parseInt(params.pageNumber) : 1;

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
