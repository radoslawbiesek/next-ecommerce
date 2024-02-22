import Link from "next/link";

import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { type ProductImagesFragment, type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = ProductListItemFragment & ProductImagesFragment;

export function ProductListItem({ name, price, slug, images }: ProductListItemProps) {
  return (
    <li className="w-80">
      <Link href={`/product/${slug}`}>
        <article className="card bg-base-100 shadow-xl">
          {images[0] && <ProductListItemCoverImage src={images[0].url} alt={images[0].alt || name} />}
          <ProductListItemDescription name={name} price={price} />
        </article>
      </Link>
    </li>
  );
}
