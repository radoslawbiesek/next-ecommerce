import { type ProductItem } from "@/ui/types";
import { formatPrice } from "@/helpers/formatPrice";

type ProductListItemDescriptionProps = Pick<ProductItem, "name" | "category" | "price">;

export function ProductListItemDescription({ name, category, price }: ProductListItemDescriptionProps) {
  return (
    <div className="flex-column card-body items-end">
      <h3 className="card-title">{name}</h3>
      <p>{formatPrice(price / 100)}</p>
      <p className="badge badge-outline">{category}</p>
    </div>
  );
}
