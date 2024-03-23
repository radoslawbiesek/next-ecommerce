import NextLink from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { getAllOrders } from "@/services/orders";

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const orders = await getAllOrders(user.id);

  return (
    <section className="flex flex-col justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold">Your Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order number</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdAt}</td>
              <td>{order.status?.split(".").at(-1)}</td>
              <td>
                <NextLink className="btn btn-link btn-secondary" href={`/orders/${order.id}`}>
                  details
                </NextLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
