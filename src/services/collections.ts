import { executeGraphQL } from "./graphql";
import { CollectionGetBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export async function getAll() {
  const response = await executeGraphQL({ query: CollectionsGetListDocument });

  return response.collections?.data;
}

export async function getBySlug(
  slug: string,
  { productsTake, productsSkip }: { productsTake?: number; productsSkip?: number } = {},
) {
  const response = await executeGraphQL({
    query: CollectionGetBySlugDocument,
    variables: {
      slug,
      products_take: productsTake,
      products_skip: productsSkip,
    },
  });

  return response.collection;
}
