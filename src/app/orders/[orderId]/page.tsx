import clsx from "clsx";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getOrderById } from "@/services/orders";
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

  const order = await getOrderById(parseInt(orderId), user.id);
  if (!order) {
    return redirect("/orders");
  }

  const total = calculateCartTotal(order);

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Order {order.id}</h1>
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
    </section>
  );
}
