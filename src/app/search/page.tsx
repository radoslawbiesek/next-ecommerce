import { notFound } from "next/navigation";

import { ProductList } from "@/ui/organisms/ProductList";
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

  const filters = {
    ...(search && search.length >= 2 ? { search } : {}),
  };
  const { data } = await productsService.getAll(filters);

  return (
    <section className="h-full">
      <ProductList products={data} />
    </section>
  );
}
