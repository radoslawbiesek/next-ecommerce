import { type Route } from "next";

import { ProductList } from "@/ui/organisms/ProductList";
import * as productsService from "@/services/products";
import { range } from "@/helpers/range";
import { Pagination } from "@/ui/molecules/Pagination";
import { parsePage } from "@/helpers/parsePage";
import { PRODUCTS_PER_PAGE } from "@/contants";

export const metadata = {
  title: "Products - Shop",
};

export function generateStaticParams() {
  return range(1, 3).map((pageNumber) => ({ pageNumber: pageNumber.toString() }));
}

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
  const page = parsePage(params.pageNumber);
  const { data, total } = await productsService.getAll({
    take: PRODUCTS_PER_PAGE,
    skip: (page - 1) * PRODUCTS_PER_PAGE,
  });

  return (
    <section className="h-full">
      <ProductList products={data} />
      <div className="flex justify-center p-8">
        <Pagination
          total={total}
          currentPage={page}
          perPage={PRODUCTS_PER_PAGE}
          generateHref={(page: number) => `/products/${page}` as Route}
        />
      </div>
    </section>
  );
}
