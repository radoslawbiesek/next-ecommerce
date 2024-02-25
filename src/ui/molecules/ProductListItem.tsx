import Link from "next/link";

import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = ProductListItemFragment;

export function ProductListItem(props: ProductListItemProps) {
  return (
    <li className="w-80">
      <Link href={`/product/${props.slug}`}>
        <article className="card bg-base-100 shadow-xl">
          {props.images[0] && (
            <ProductListItemCoverImage src={props.images[0].url} alt={props.images[0].alt || props.name} />
          )}
          <ProductListItemDescription {...props} />
        </article>
      </Link>
    </li>
  );
}
