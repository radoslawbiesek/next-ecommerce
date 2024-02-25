import { Suspense } from "react";
import { type Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";

import * as productsService from "@/services/products";
import { formatPrice } from "@/helpers/formatPrice";
import { CheckIcon } from "@/ui/atoms/CheckIcon";
import { RecommendedProducts } from "@/ui/organisms/RecommendedProducts";

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
      <article className="flex gap-8">
        <div>
          {product.images[0] && (
            <NextImage
              className="rounded-lg"
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              width={500}
              height={500}
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-xl">{formatPrice(product.price / 100)}</p>
          <p className="mt-4 italic text-slate-700">{product.description}</p>
          {product.inStock > 0 && (
            <div className="badge badge-md mt-4">
              <CheckIcon className="h-3 w-3" />
              <span className="ml-1">In stock</span>
            </div>
          )}
          <form className="mt-8">
            <label className="form-control mt-2 w-full max-w-xs">
              <select className="select select-bordered">
                <option disabled selected>
                  Select variant
                </option>
                {product.variants.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <button className="btn btn-neutral mt-2 w-full max-w-xs" disabled={product.inStock === 0}>
              Add to cart
            </button>
          </form>
        </div>
      </article>
      <Suspense>
        <RecommendedProducts productId={product.id} />
      </Suspense>
    </section>
  );
}
