import { type Metadata } from "next";

import * as productsService from "@/services/products";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { formatPrice } from "@/helpers/formatPrice";

type ProductPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productsService.getBySlug(params.slug);

  return {
    title: `${product.name} - Shop`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Shop`,
      description: product.description,
      ...(product.coverImage ? { images: [{ url: product.coverImage.src }] } : {}),
    },
  };
}

export default async function Product({ params }: ProductPageProps) {
  const product = await productsService.getBySlug(params.slug);

  if (!product) {
    return <section className="h-full">Product not found</section>;
  }

  return (
    <section className="h-full">
      <article className="card bg-base-100 shadow-xl">
        {product.coverImage && <ProductListItemCoverImage {...product.coverImage} />}
        <div className="flex-column card-body items-end">
          <h1 className="card-title">{product.name}</h1>
          <p>{formatPrice(product.price / 100)}</p>
          {product.category && <p className="badge badge-outline">{product.category.name}</p>}
          <p>{product.description}</p>
        </div>
      </article>
    </section>
  );
}
