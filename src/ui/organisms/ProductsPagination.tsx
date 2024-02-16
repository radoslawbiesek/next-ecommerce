import { type Route } from "next";

import * as productsService from "@/services/products";
import { Pagination } from "@/ui/molecules/Pagination";

export async function ProductsPagination({ page, perPage }: { page: number; perPage: number }) {
  const count = await productsService.getCount();

  return (
    <div className="flex justify-center p-8">
      <Pagination
        total={count}
        currentPage={page}
        perPage={perPage}
        generateHref={(page: number) => `/products/${page}` as Route}
      />
    </div>
  );
}
