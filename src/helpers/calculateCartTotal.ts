import { type CartFragment } from "@/gql/graphql";

export function calculateCartTotal(cart?: CartFragment | null) {
  if (!cart) {
    return 0;
  }

  return cart?.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
}
