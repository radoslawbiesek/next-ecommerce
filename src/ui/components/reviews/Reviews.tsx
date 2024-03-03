"use client";

import { useOptimistic } from "react";

import clsx from "clsx";

import { Rating } from "@/ui/elements/Rating";
import { ReviewForm } from "@/ui/components/reviews/ReviewForm";
import { ReviewsList } from "@/ui/components/reviews/ReviewsList";
import { type ReviewFragment, type ProductListItemFragment, type ReviewInput } from "@/gql/graphql";
import * as reviewsActions from "@/actions/reviews";

type ReviewsProps = {
  reviews: ReviewFragment[];
  product: Pick<ProductListItemFragment, "id" | "rating">;
  className?: string;
};

function validate(formData: FormData): ReviewInput | undefined {
  const raw = {
    productId: formData.get("productId"),
    headline: formData.get("headline"),
    content: formData.get("content"),
    rating: formData.get("rating"),
    name: formData.get("name"),
    email: formData.get("email"),
  };

  console.log(raw);

  if (
    "productId" in raw &&
    typeof raw.productId === "string" &&
    !isNaN(parseInt(raw.productId)) &&
    "headline" in raw &&
    typeof raw.headline === "string" &&
    "content" in raw &&
    typeof raw.content === "string" &&
    "rating" in raw &&
    typeof raw.rating === "string" &&
    !isNaN(parseInt(raw.rating)) &&
    "name" in raw &&
    typeof raw.name === "string" &&
    "email" in raw &&
    typeof raw.email === "string"
  ) {
    return {
      productId: parseInt(raw.productId),
      headline: raw.headline,
      content: raw.content,
      rating: parseInt(raw.rating),
      name: raw.name,
      email: raw.email,
    };
  }
}

export function Reviews({ reviews, product, className }: ReviewsProps) {
  const [optimisticReviews, setOptimisticReviews] = useOptimistic(reviews, (currentReviews, newReview: ReviewInput) => [
    { ...newReview, id: 0, createdAt: new Date().toDateString() },
    ...currentReviews,
  ]);

  const handleReviewSubmit = async (formData: FormData) => {
    const data = validate(formData);
    if (!data) {
      return;
    }

    setOptimisticReviews(data);
    await reviewsActions.addReview(data);
  };

  return (
    <div className={clsx("flex gap-32", className)}>
      <div className="flex max-w-xs flex-col gap-4">
        <h2 className="text-2xl font-bold">Customer reviews</h2>
        <div className="flex items-center gap-2">
          {product.rating && <Rating value={product.rating} />}
          {reviews.length > 0 && (
            <p className="text-xs italic">
              Based on <strong>{reviews.length}</strong> reviews
            </p>
          )}
        </div>
        <h3 className="mt-4 text-xl font-semibold">Share your thoughts</h3>
        <p className="text-sm">If you’ve used this product, share your thoughts with other customers</p>
        <ReviewForm productId={product.id} action={handleReviewSubmit} />
      </div>
      {reviews.length > 0 ? (
        <ReviewsList reviews={optimisticReviews} />
      ) : (
        <p className="w-full text-center font-semibold">There are no reviews for this product yet</p>
      )}
    </div>
  );
}
