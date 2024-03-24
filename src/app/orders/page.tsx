import NextLink from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import * as ordersService from "@/services/orders";

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const orders = await ordersService.getAll(user.id);

  return (
    <section className="card my-8 flex flex-col justify-center gap-4 bg-base-100">
      <div className="card-body">
        <h1 className="cart-title mb-4 text-3xl font-bold">Your Orders</h1>
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
      </div>
    </section>
  );
}
