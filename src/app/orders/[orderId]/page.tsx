import clsx from "clsx";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import NextLink from "next/link";
import * as ordersService from "@/services/orders";
import { CartListItemCompact } from "@/ui/components/cart/CartListItemCompact";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";
import { formatPrice } from "@/helpers/formatPrice";

export type OrderDetailsProps = {
  params: { orderId: string };
};

export default async function OrderDetailsPage({ params: { orderId } }: OrderDetailsProps) {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const order = await ordersService.getById(parseInt(orderId), user.id);
  if (!order) {
    return redirect("/orders");
  }

  const total = calculateCartTotal(order);

  return (
    <section className="my-8">
      <div className="card bg-base-100">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <NextLink href="/orders" className="btn btn-outline btn-neutral btn-sm">
              Go back to orders
            </NextLink>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : null}
            </p>
            <p>
              <strong>Total:</strong> {formatPrice(total / 100)}
            </p>
          </div>
          <ul>
            {order.items.map((item, index) => (
              <CartListItemCompact key={item.id} {...item} className={clsx({ "border-t": index !== 0 })} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
