import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/helpers/formatPrice";
import { Rating } from "@/ui/components/reviews/Rating";

type ProductListItemDescriptionProps = Pick<ProductListItemFragment, "name" | "price" | "categories" | "rating">;

export function ProductListItemDescription({ name, price, categories, rating }: ProductListItemDescriptionProps) {
  return (
    <div className="flex-column card-body">
      <div className="flex items-center justify-between font-bold">
        <h3>{name}</h3>
        <span data-testid="product-price">{formatPrice(price / 100)}</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {categories.map((category) => (
            <p className="badge badge-outline" key={`${category.name}-${category.id}`}>
              {category.name}
            </p>
          ))}
        </div>
        {rating && <Rating value={rating} />}
      </div>
    </div>
  );
}
