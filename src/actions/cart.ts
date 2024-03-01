"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import * as cartService from "@/services/cart";

export async function addProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  const quantity = formData.get("quantity") as string;
  const variant = formData.get("variant") as string;

  return getOrCreate({
    productId: parseInt(productId),
    quantity: parseInt(quantity),
    variant,
  });
}

async function getOrCreate(input?: { productId: number; quantity: number; variant: string }) {
  const cartId = cookies().get("cartId")?.value;
  const cart = await cartService.findOrCreate(cartId ? parseInt(cartId) : undefined, input);

  if (!cart) {
    throw new Error("Could not create cart");
  }

  cookies().set("cartId", cart.id.toString());

  return cart;
}

export async function changeItemQuantity(cartItemId: number, quantity: number) {
  const result = await cartService.changeItemQuantity(cartItemId, quantity);
  revalidateTag("cart");

  return result;
}

export async function removeItem(cartItemId: number) {
  const result = await cartService.removeItem(cartItemId);
  revalidateTag("cart");

  return result;
}
