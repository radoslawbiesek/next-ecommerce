import clsx from "clsx";

import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/helpers/formatPrice";

type ProductListItemDescriptionProps = Pick<ProductListItemFragment, "name" | "price" | "categories" | "rating">;

export function ProductListItemDescription({ name, price, categories, rating }: ProductListItemDescriptionProps) {
  return (
    <div className="flex-column card-body">
      <div className="flex items-center justify-between font-bold">
        <span>{name}</span>
        <span>{formatPrice(price / 100)}</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {categories.map((category) => (
            <p className="badge badge-outline" key={`${category.name}-${category.id}`}>
              {category.name}
            </p>
          ))}
        </div>
        <div className="rating rating-sm">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              type="radio"
              key={index}
              className={clsx("mask mask-star-2", index + 1 > rating ? "bg-slate-300" : "")}
              disabled
            />
          ))}
        </div>
      </div>
    </div>
  );
}
