import { type Metadata } from "next";
import { notFound } from "next/navigation";

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
      ...(product.images.length
        ? { images: product.images.map((image) => ({ url: image.url, ...(image.alt ? { alt: image.alt } : {}) })) }
        : {}),
    },
  };
}

export default async function Product({ params }: ProductPageProps) {
  const product = await productsService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <section className="h-full">
      <article className="card bg-base-100 shadow-xl">
        {product.images[0] && (
          <ProductListItemCoverImage src={product.images[0].url} alt={product.images[0].alt || product.name} />
        )}
        <div className="flex-column card-body items-end">
          <h1 className="card-title">{product.name}</h1>
          <p>{formatPrice(product.price / 100)}</p>
          {/* {product.categories.map((category) => (
            <p className="badge badge-outline" key={category.id}>
              {category.name}
            </p>
          ))} */}
          <p>{product.description}</p>
        </div>
      </article>
    </section>
  );
}
