import { executeGraphQL } from "./graphql";
import { CollectionGetBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export async function getAll() {
  const response = await executeGraphQL(CollectionsGetListDocument);

  return response.collections?.data;
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL(CollectionGetBySlugDocument, { slug });

  return response.collection;
}
