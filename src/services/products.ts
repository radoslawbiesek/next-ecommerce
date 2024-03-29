import { executeGraphQL } from "@/services/graphql";
import { ProductGetBySlugDocument, ProductsGetListDocument, RecommendedProductsGetListDocument } from "@/gql/graphql";

export async function getAll({
  take,
  skip,
  search,
  ordering,
}: {
  take?: number;
  skip?: number;
  search?: string;
  ordering?: string;
}) {
  const response = await executeGraphQL({
    query: ProductsGetListDocument,
    variables: { take, skip, search, ordering },
    cache: "no-store",
  });

  return { data: response.products?.data ?? [], total: response.products?.meta?.total ?? 0 };
}

export async function getRecommendedProducts(productId: number, { take }: { take?: number }) {
  const response = await executeGraphQL({
    query: RecommendedProductsGetListDocument,
    variables: {
      take,
      productId,
    },
    next: { tags: [`recommended-products?productId=${productId}&take=${take}`] },
  });

  return response.recommended_products?.data ?? [];
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL({
    query: ProductGetBySlugDocument,
    variables: { slug },
    next: { tags: [`product/${slug}`] },
  });

  const { product } = response;

  return product;
}
