import { formatPrice } from "@/helpers/formatPrice";

type ProductListItemDescriptionProps = {
  name: string;
  price: number;
  categories: {
    name: string;
    id: string;
  }[];
};

export function ProductListItemDescription({ name, categories, price }: ProductListItemDescriptionProps) {
  return (
    <div className="flex-column card-body items-end">
      <h3 className="card-title">{name}</h3>
      <p>{formatPrice(price / 100)}</p>
      {categories.map((category) => (
        <p className="badge badge-outline" key={`${name}-${category.id}`}>
          {category.name}
        </p>
      ))}
    </div>
  );
}
