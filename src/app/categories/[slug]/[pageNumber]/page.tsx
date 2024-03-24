import { notFound } from "next/navigation";
import { type Metadata, type Route } from "next";

import { ProductList } from "@/ui/components/products/ProductList";
import * as categoriesService from "@/services/categories";
import { Pagination } from "@/ui/components/common/Pagination";
import { parsePage } from "@/helpers/parsePage";
import { PRODUCTS_PER_PAGE } from "@/contants";
import { OrderingSelect } from "@/ui/components/common/OrderingSelect";

type CategoriesPageProps = {
  params: {
    slug: string;
    pageNumber: string;
  };
  searchParams: {
    ordering?: string;
  };
};

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const result = await categoriesService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return {
    title: result.name,
    description: result.description,
  };
}

export default async function CategoriesPage({ params, searchParams }: CategoriesPageProps) {
  const page = parsePage(params.pageNumber);

  const result = await categoriesService.getBySlug(params.slug, {
    productsSkip: (page - 1) * PRODUCTS_PER_PAGE,
    productsTake: PRODUCTS_PER_PAGE,
    productsOrdering: searchParams.ordering,
  });
  if (!result) {
    return notFound();
  }

  return (
    <section className="flex flex-grow flex-col">
      <div className="fullwidth-container flex items-end justify-between bg-base-100 py-6">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">{result.name}</h1>
          <OrderingSelect />
        </div>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 py-10">
        <ProductList products={result.products.data} />
        <div className="flex justify-center">
          <Pagination
            total={result.products.meta.total}
            currentPage={page}
            perPage={PRODUCTS_PER_PAGE}
            generateHref={(page: number) =>
              `/categories/${params.slug}/${page}?${new URLSearchParams(searchParams).toString()}` as Route
            }
          />
        </div>
      </div>
    </section>
  );
}
