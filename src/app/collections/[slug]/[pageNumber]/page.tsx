import { notFound } from "next/navigation";
import { type Route, type Metadata } from "next";

import { ProductList } from "@/ui/components/products/ProductList";
import * as collectionService from "@/services/collections";
import { Pagination } from "@/ui/components/common/Pagination";
import { parsePage } from "@/helpers/parsePage";
import { PRODUCTS_PER_PAGE } from "@/contants";
import { OrderingSelect } from "@/ui/components/common/OrderingSelect";

type CollectionPageProps = {
  params: {
    slug: string;
    pageNumber: string;
  };
  searchParams: {
    ordering?: string;
  };
};

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const result = await collectionService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return {
    title: result.name,
    description: result.description,
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const page = parsePage(params.pageNumber);

  const result = await collectionService.getBySlug(params.slug, {
    productsSkip: (page - 1) * PRODUCTS_PER_PAGE,
    productsTake: PRODUCTS_PER_PAGE,
    productsOrdering: searchParams.ordering,
  });
  if (!result) {
    return notFound();
  }

  return (
    <section className="h-full">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">{result.name}</h1>
        <OrderingSelect />
      </div>
      <ProductList className="mt-8" products={result.products.data} />
      <div className="mt-8 flex justify-center">
        <Pagination
          total={result.products.meta.total}
          currentPage={page}
          perPage={PRODUCTS_PER_PAGE}
          generateHref={(page: number) =>
            `/collections/${params.slug}/${page}?${new URLSearchParams(searchParams).toString()}` as Route
          }
        />
      </div>
    </section>
  );
}
