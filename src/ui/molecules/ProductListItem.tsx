import Link from "next/link";

import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { type ProductItem } from "@/ui/types";

type ProductListItemProps = ProductItem;

export function ProductListItem({ name, price, slug, images, categories }: ProductListItemProps) {
  return (
    <li className="w-80">
      <Link href={`/product/${slug}`}>
        <article className="card bg-base-100 shadow-xl">
          {images[0] && <ProductListItemCoverImage src={images[0].url} alt={images[0].alt} />}
          {categories && <ProductListItemDescription name={name} categories={categories} price={price} />}
        </article>
      </Link>
    </li>
  );
}
