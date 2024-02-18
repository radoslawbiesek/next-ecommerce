import { executeGraphQL } from "@/services/graphql";
import { ProductGetBySlugDocument, ProductsGetListDocument } from "@/gql/graphql";

export async function getAll(take: number, skip?: number) {
  const response = await executeGraphQL(ProductsGetListDocument, { take, skip });

  const products = response.products.data.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.categories[0]?.name,
      price: product.price,
      slug: product.slug,
      coverImage: product.images[0] ? { src: product.images[0].url, alt: product.name } : undefined,
    };
  });

  return { data: products, total: response.products.meta.total };
}

export async function getBySlug(slug: string) {
  const response = await executeGraphQL(ProductGetBySlugDocument, { slug });

  const { product } = response;
  if (!product) {
    throw new Error(`Product ${slug} not found`);
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.categories[0],
    price: product.price,
    slug: product.slug,
    coverImage: product.images[0] ? { src: product.images[0].url, alt: product.name } : undefined,
  };
}
