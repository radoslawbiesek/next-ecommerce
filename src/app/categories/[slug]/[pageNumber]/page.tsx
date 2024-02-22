import { notFound } from "next/navigation";
import { type Metadata, type Route } from "next";

import { ProductList } from "@/ui/organisms/ProductList";
import * as categoriesService from "@/services/categories";
import { Pagination } from "@/ui/molecules/Pagination";
import { parsePage } from "@/helpers/parsePage";
import { PRODUCTS_PER_PAGE } from "@/contants";

type CategoriesPageProps = {
  params: {
    slug: string;
    pageNumber: string;
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

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const page = parsePage(params.pageNumber);

  const result = await categoriesService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return (
    <section className="h-full">
      <ProductList products={result.products.data} />
      <div className="flex justify-center p-8">
        <Pagination
          total={result.products.meta.total}
          currentPage={page}
          perPage={PRODUCTS_PER_PAGE}
          generateHref={(page: number) => `/categories/${params.slug}/${page}` as Route}
        />
      </div>
    </section>
  );
}
