import Link from "next/link";
import clsx from "clsx";

import { ProductListItemDescription } from "@/ui/elements/ProductListItemDescription";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = ProductListItemFragment & { className?: string };

export function ProductListItem(props: ProductListItemProps) {
  return (
    <li className={clsx("w-80", props.className)}>
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
