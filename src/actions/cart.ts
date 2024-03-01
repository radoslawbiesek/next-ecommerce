"use server";

import { cookies } from "next/headers";

import { CartFindOrCreateDocument, type CartFragment } from "@/gql/graphql";
import { executeGraphQL } from "@/services/graphql";

export async function addProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  const quantity = formData.get("quantity") as string;
  const variant = formData.get("variant") as string;

  return getOrCreateCart({
    productId: parseInt(productId),
    quantity: parseInt(quantity),
    variant,
  });
}

async function getOrCreateCart(input?: {
  productId: number;
  quantity: number;
  variant: string;
}): Promise<CartFragment> {
  const cartId = cookies().get("cartId")?.value;

  const { cartFindOrCreate: cart } = await executeGraphQL(CartFindOrCreateDocument, {
    input,
    ...(cartId ? { id: parseInt(cartId) } : {}),
  });

  if (!cart) {
    throw new Error("Could not create cart");
  }

  cookies().set("cartId", cart.id.toString());

  return cart;
}
