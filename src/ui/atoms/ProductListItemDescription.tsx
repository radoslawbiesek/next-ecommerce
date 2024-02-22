import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/helpers/formatPrice";

type ProductListItemDescriptionProps = Pick<ProductListItemFragment, "name" | "price">;

export function ProductListItemDescription({ name, price }: ProductListItemDescriptionProps) {
  return (
    <div className="flex-column card-body items-end">
      <h3 className="card-title">{name}</h3>
      <p>{formatPrice(price / 100)}</p>
      {/* {categories.map((category) => (
        <p className="badge badge-outline" key={`${name}-${category.id}`}>
          {category.name}
        </p>
      ))} */}
    </div>
  );
}
