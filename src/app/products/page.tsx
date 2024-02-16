import { Suspense } from "react";

import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/organisms/Pagination";
import * as productsService from "@/services/products";

function parseSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  let page = 1;
  if (typeof searchParams.page === "string" && !isNaN(parseInt(searchParams.page))) {
    page = parseInt(searchParams.page);
  }

  return { page };
}

async function ProductsPagination({ page, perPage }: { page: number; perPage: number }) {
  const count = await productsService.getCount();

  return (
    <div className="flex justify-center p-8">
      <Pagination
        total={count}
        currentPage={page}
        perPage={perPage}
        generateHref={(page: number) => `/products?page=${page}`}
      />
    </div>
  );
}

export default async function Products({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const perPage = 20;
  const { page } = parseSearchParams(searchParams);

  const products = await productsService.getAll(perPage, (page - 1) * perPage);

  return (
    <section className="h-full">
      <ProductList products={products} />
      <Suspense>
        <ProductsPagination page={page} perPage={perPage} />
      </Suspense>
    </section>
  );
}
