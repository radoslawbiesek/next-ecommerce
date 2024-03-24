import { ReviewCreateDocument, type ReviewInput, ReviewsGetListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/services/graphql";

export async function getAll(productId: number) {
  const { reviews } = await executeGraphQL({
    query: ReviewsGetListDocument,
    variables: { productId },
    next: { tags: [`reviews/${productId}`] },
  });

  return reviews;
}

export async function create(input: ReviewInput) {
  const { addReview } = await executeGraphQL({
    query: ReviewCreateDocument,
    variables: { input },
  });

  return addReview;
}
