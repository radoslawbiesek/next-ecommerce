import { executeGraphQL } from "./graphql";
import { CategoriesGetListDocument, CategoryGetBySlugDocument } from "@/gql/graphql";

export async function getAll() {
  const response = await executeGraphQL({ query: CategoriesGetListDocument });

  return response.categories?.data;
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
    query: CategoryGetBySlugDocument,
    variables: {
      slug,
      products_take: productsTake,
      products_skip: productsSkip,
      products_ordering: productsOrdering,
    },
  });

  return response.category;
}
