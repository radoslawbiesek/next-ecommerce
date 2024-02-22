import { executeGraphQL } from "./graphql";
import { CategoriesGetListDocument, CategoryGetBySlugDocument } from "@/gql/graphql";

export async function getAll() {
  const response = await executeGraphQL(CategoriesGetListDocument);

  return response.categories?.data;
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL(CategoryGetBySlugDocument, { slug });

  return response.category;
}
