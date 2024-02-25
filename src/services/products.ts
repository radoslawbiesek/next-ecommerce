import { executeGraphQL } from "@/services/graphql";
import { ProductGetBySlugDocument, ProductsGetListDocument, RecommendedProductsGetListDocument } from "@/gql/graphql";

export async function getAll({ take, skip, search }: { take?: number; skip?: number; search?: string }) {
  const response = await executeGraphQL(ProductsGetListDocument, { take, skip, search });

  return { data: response.products?.data ?? [], total: response.products?.meta?.total ?? 0 };
}

export async function getRecommendedProducts(productId: number, { take }: { take?: number }) {
  const response = await executeGraphQL(RecommendedProductsGetListDocument, {
    take,
    productId,
  });

  return response.recommended_products?.data ?? [];
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL(ProductGetBySlugDocument, { slug });

  const { product } = response;
  if (!product) {
    throw new Error(`Product ${slug} not found`);
  }

  return product;
}
