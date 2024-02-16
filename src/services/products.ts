import { type ProductItem } from "@/ui/types";

type ResponseProductItem = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
};

export async function getAll(limit = 20, offset?: number): Promise<ProductItem[]> {
  const url = new URL("https://naszsklep-api.vercel.app/api/products");
  url.searchParams.set("take", limit.toString());
  if (offset) {
    url.searchParams.set("offset", offset.toString());
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const products = (await response.json()) as ResponseProductItem[];

  return products.map(transformProduct);
}

export async function getById(id: ResponseProductItem["id"]): Promise<ProductItem> {
  const response = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const product = (await response.json()) as ResponseProductItem;

  return transformProduct(product);
}

export async function getCount(): Promise<number> {
  const response = await fetch("https://naszsklep-api.vercel.app/api/products?take=10000", {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const products = (await response.json()) as ResponseProductItem[];

  return products.length;
}

function transformProduct(product: ResponseProductItem): ProductItem {
  return {
    id: product.id,
    name: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    coverImage: { src: product.image, alt: product.title },
  };
}
