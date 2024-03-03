import { Suspense } from "react";
import { type Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";

import * as productsService from "@/services/products";
import * as cartActions from "@/actions/cart";
import { formatPrice } from "@/helpers/formatPrice";
import { CheckIcon } from "@/ui/elements/icons/CheckIcon";
import { RecommendedProducts } from "@/ui/components/products/RecommendedProducts";
import { SubmitButton } from "@/ui/elements/form/SubmitButton";
import { ReviewsWrapper } from "@/ui/components/reviews/ReviewsWrapper";

type ProductPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productsService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

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
          <form className="mt-8 flex w-full max-w-xs flex-col gap-4" action={cartActions.addProduct}>
            <input type="hidden" name="productId" value={product.id} />
            <div className="flex gap-2">
              <label className="form-control w-6/12">
                <div className="label">
                  <span className="label-text">Variant</span>
                </div>
                <select className="select select-bordered" name="variant" defaultValue={product.variants[0]} required>
                  {product.variants.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-control w-6/12">
                <div className="label">
                  <span className="label-text">Quantity</span>
                </div>
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  placeholder="Quantity"
                  className="input input-bordered"
                />
              </label>
            </div>
            <SubmitButton>Add to cart</SubmitButton>
          </form>
        </div>
      </article>
      <Suspense>
        <RecommendedProducts productId={product.id} />
      </Suspense>
      <Suspense>
        <ReviewsWrapper product={product} className="mb-8 mt-24" />
      </Suspense>
    </section>
  );
}
