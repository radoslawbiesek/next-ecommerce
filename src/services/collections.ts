import { executeGraphQL } from "./graphql";
import { CollectionGetBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export async function getAll() {
  const response = await executeGraphQL({ query: CollectionsGetListDocument });

  return response.collections?.data;
}

export async function getBySlug(
  slug: string,
  {
    productsTake,
    productsSkip,
    productsOrdering,
  }: { productsTake?: number; productsSkip?: number; productsOrdering?: string } = {},
) {
  const response = await executeGraphQL({
    query: CollectionGetBySlugDocument,
    variables: {
      slug,
      products_take: productsTake,
      products_skip: productsSkip,
      products_ordering: productsOrdering,
    },
  });

  return response.collection;
}
