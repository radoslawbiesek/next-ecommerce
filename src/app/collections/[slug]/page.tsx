import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { ProductList } from "@/ui/organisms/ProductList";
import * as collectionService from "@/services/collections";

type CollectionPageProps = {
  params: {
    slug: string;
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

export default async function CollectionPage({ params }: CollectionPageProps) {
  const result = await collectionService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return (
    <section className="h-full">
      <ProductList products={result.products} />
    </section>
  );
}
