import { executeGraphQL } from "@/services/graphql";
import { ProductGetBySlugDocument, ProductsGetListDocument } from "@/gql/graphql";
import { type ProductItem } from "@/ui/types";

export async function getAll(take: number, skip?: number): Promise<{ data: ProductItem[]; total: number }> {
  const response = await executeGraphQL(ProductsGetListDocument, { take, skip });

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
