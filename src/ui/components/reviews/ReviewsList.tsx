"use client";

import { type ReviewFragment } from "@/gql/graphql";
import { Rating } from "@/ui/components/reviews/Rating";

type ReviewsListProps = { reviews: ReviewFragment[] };

export async function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className="w-full">
      {reviews.map((review, index) => (
        <li key={review.id} className="flex flex-col gap-2">
          {index !== 0 && <div className="divider" />}
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="w-12 rounded-full bg-neutral text-neutral-content">
                <span>{review.name[0]?.toUpperCase() || "A"}</span>
              </div>
            </div>
            <div>
              <p className="text-md font-bold">{review.name}</p>
              <span className="text-xs italic">{new Date(review.createdAt).toDateString()}</span>
              <Rating value={review.rating} />
            </div>
          </div>
          <h3 className="text-lg font-bold">{review.headline}</h3>
          <p className="text-slate-700">{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
