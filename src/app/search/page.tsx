import { notFound } from "next/navigation";

import { ProductList } from "@/ui/components/products/ProductList";
import * as productsService from "@/services/products";

type SearchPageProps = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const search = searchParams["query"];
  if (Array.isArray(search)) {
    return notFound();
  }

  const { data, total } = await productsService.getAll({ search: search ? decodeURIComponent(search) : undefined });

  return (
    <section className="h-full">
      <ProductList products={data} />
      <p className="mt-8 text-center italic">
        Showing {data.length} of {total} total results
      </p>
    </section>
  );
}
