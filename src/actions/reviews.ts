"use server";

import { revalidateTag } from "next/cache";

import * as reviewsService from "@/services/reviews";
import { type ReviewInput } from "@/gql/graphql";

export async function addReview(data: ReviewInput) {
  await reviewsService.create(data);
  revalidateTag(`reviews/${data.productId}`);
}
