import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { ProductList } from "@/ui/organisms/ProductList";
import * as categoryService from "@/services/categories";

type CategoriesPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const result = await categoryService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return {
    title: result.name,
    description: result.description,
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const result = await categoryService.getBySlug(params.slug);
  if (!result) {
    return notFound();
  }

  return (
    <section className="h-full">
      <ProductList products={result.products} />
    </section>
  );
}
