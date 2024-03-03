import { type ProductListItemFragment } from "@/gql/graphql";
import * as reviewsService from "@/services/reviews";
import { Reviews } from "@/ui/components/reviews/Reviews";

type ReviewsProps = { className?: string; product: Pick<ProductListItemFragment, "id" | "rating"> };

export async function ReviewsWrapper({ className, product }: ReviewsProps) {
  const reviews = await reviewsService.getAll(product.id);

  return <Reviews product={product} reviews={reviews} className={className} />;
}
