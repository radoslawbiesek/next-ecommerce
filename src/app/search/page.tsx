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

  const decoded = search ? decodeURIComponent(search) : undefined;

  const { data, total } = await productsService.getAll({ search: decoded });

  return (
    <section className="flex flex-grow flex-col">
      <div className="fullwidth-container flex items-end justify-between bg-base-100 py-6">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">Searching {`"${decoded || ""}"`}</h1>
        </div>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 py-10">
        <ProductList products={data} />
        <p className="mt-8 text-center italic">
          Showing {data.length} of {total} total results
        </p>
      </div>
    </section>
  );
}
