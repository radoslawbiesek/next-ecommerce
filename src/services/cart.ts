import { executeGraphQL } from "./graphql";
import { CartGetByIdDocument } from "@/gql/graphql";

export async function getById(id: number) {
  const response = await executeGraphQL(CartGetByIdDocument, { id });

  return response.cart;
}
