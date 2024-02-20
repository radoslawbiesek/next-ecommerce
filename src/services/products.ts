import { executeGraphQL } from "@/services/graphql";
import { ProductGetBySlugDocument, type ProductListItemFragment, ProductsGetListDocument } from "@/gql/graphql";

export async function getAll({
  take,
  skip,
  search,
}: {
  take?: number;
  skip?: number;
  search?: string;
}): Promise<{ data: ProductListItemFragment[]; total: number }> {
  const response = await executeGraphQL(ProductsGetListDocument, { take, skip, search });

  return { data: response.products.data, total: response.products.meta.total };
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL(ProductGetBySlugDocument, { slug });

  const { product } = response;
  if (!product) {
    throw new Error(`Product ${slug} not found`);
  }

  return product;
}
