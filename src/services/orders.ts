import { executeGraphQL } from "./graphql";
import { OrderUpdateDocument, OrdersGetListDocument, OrderGetByIdDocument } from "@/gql/graphql";

export async function updateOrder(id: number, status: string, userId: string) {
  const { orderUpdate } = await executeGraphQL({
    query: OrderUpdateDocument,
    variables: { id, input: { status, userId } },
  });

  return orderUpdate;
}

export async function getAllOrders(userId: string) {
  const { orders } = await executeGraphQL({
    query: OrdersGetListDocument,
    variables: { userId },
  });

  return orders;
}

export async function getOrderById(id: number, userId: string) {
  const { order } = await executeGraphQL({
    query: OrderGetByIdDocument,
    variables: { id, userId },
  });

  return order;
}
