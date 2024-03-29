import { type Route } from "next";

import { ProductList } from "@/ui/components/products/ProductList";
import * as productsService from "@/services/products";
import { Pagination } from "@/ui/components/common/Pagination";
import { parsePage } from "@/helpers/parsePage";
import { PRODUCTS_PER_PAGE } from "@/contants";
import { OrderingSelect } from "@/ui/components/common/OrderingSelect";

export const metadata = {
  title: "Products - Shop",
};

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { pageNumber: string };
  searchParams: { ordering?: string };
}) {
  const page = parsePage(params.pageNumber);
  const { data, total } = await productsService.getAll({
    take: PRODUCTS_PER_PAGE,
    skip: (page - 1) * PRODUCTS_PER_PAGE,
    ordering: searchParams.ordering,
  });

  return (
    <section className="flex flex-grow flex-col">
      <div className="fullwidth-container flex items-end justify-between bg-base-100 py-6">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">All products</h1>
          <OrderingSelect />
        </div>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 py-10">
        <ProductList products={data} />
        <div className="flex justify-center">
          <Pagination
            total={total}
            currentPage={page}
            perPage={PRODUCTS_PER_PAGE}
            generateHref={(page: number) =>
              `/products/${page}?${new URLSearchParams(searchParams).toString()}` as Route
            }
          />
        </div>
      </div>
    </section>
  );
}
