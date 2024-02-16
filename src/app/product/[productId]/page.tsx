import * as productsService from "@/services/products";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

export default async function Product({ params }: { params: { productId: string } }) {
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
