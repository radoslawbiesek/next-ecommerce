import Link from "next/link";

import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { type ProductItem } from "@/ui/types";

type ProductListItemProps = ProductItem;

export function ProductListItem({ coverImage, name, category, price, slug }: ProductListItemProps) {
  return (
    <li className="w-80">
      <Link href={`/product/${slug}`}>
        <article className="card bg-base-100 shadow-xl">
          {coverImage && <ProductListItemCoverImage {...coverImage} />}
          <ProductListItemDescription name={name} category={category} price={price} />
        </article>
      </Link>
    </li>
  );
}
