import { type Metadata } from "next";

import * as productsService from "@/services/products";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductPageProps = {
  params: { productId: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productsService.getById(params.productId);

  return {
    title: `${product.name} - Shop`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Shop`,
      description: product.description,
      images: [{ url: product.coverImage.src }],
    },
  };
}

export default async function Product({ params }: ProductPageProps) {
  const product = await productsService.getById(params.productId);

  if (!product) {
    return <section className="h-full">Product not found</section>;
  }

  return (
    <section className="h-full">
      <article className="card bg-base-100 shadow-xl">
        <ProductListItemCoverImage {...product.coverImage} />
        <ProductListItemDescription {...product} />
      </article>
    </section>
  );
}
