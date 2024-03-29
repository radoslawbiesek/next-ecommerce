import { cookies } from "next/headers";

import { executeGraphQL } from "./graphql";
import {
  CartFindOrCreateDocument,
  CartGetByIdDocument,
  CartRemoveItemDocument,
  CartUpdateItemQuantityDocument,
} from "@/gql/graphql";

export const CART_ID_COOKIE = "cartId";

export async function getFromCookies() {
  const cartId = cookies().get(CART_ID_COOKIE)?.value;
  if (!cartId) {
    return null;
  }

  return getById(parseInt(cartId));
}

export function removeFromCookies() {
  cookies().delete(CART_ID_COOKIE);
}

export async function getById(id: number) {
  const response = await executeGraphQL({
    query: CartGetByIdDocument,
    variables: { id },
    next: { tags: ["cart", "products"] },
  });

  return response.cart;
}

export async function changeItemQuantity(cartItemId: number, quantity: number) {
  const { cartUpdateItemQuantity } = await executeGraphQL({
    query: CartUpdateItemQuantityDocument,
    variables: { cartItemId, quantity },
  });

  return cartUpdateItemQuantity;
}

export async function findOrCreate(cartId?: number, input?: { productId: number; quantity: number; variant: string }) {
  const { cartFindOrCreate } = await executeGraphQL({
    query: CartFindOrCreateDocument,
    variables: {
      input,
      id: cartId || null,
    },
  });

  return cartFindOrCreate;
}

export async function removeItem(cartItemId: number) {
  const { cartRemoveItem } = await executeGraphQL({ query: CartRemoveItemDocument, variables: { cartItemId } });

  return cartRemoveItem;
}
