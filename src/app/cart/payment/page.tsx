import { Suspense } from "react";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import clsx from "clsx";

import * as cartService from "@/services/cart";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";
import { StripeForm } from "@/ui/components/cart/StripeForm";
import { CartListItemCompact } from "@/ui/components/cart/CartListItemCompact";

export default async function PaymentPage() {
  const cart = await cartService.getFromCookies();
  if (!cart?.items.length) {
    redirect("/cart");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY env variable");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateCartTotal(cart),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId: cart.id,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Missing client_secret");
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Payment</h1>
      <div className="flex items-start gap-8">
        <ul className="overflow-y-auto px-4 py-6 sm:px-6">
          {cart.items.map((item, index) => (
            <CartListItemCompact key={item.id} {...item} className={clsx({ "border-t": index !== 0 })} />
          ))}
        </ul>
        <Suspense>
          <StripeForm clientSecret={paymentIntent.client_secret} />
        </Suspense>
      </div>
    </section>
  );
}
