import { Suspense } from "react";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import clsx from "clsx";

import { currentUser } from "@clerk/nextjs";
import * as cartService from "@/services/cart";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";
import { StripeForm } from "@/ui/components/cart/StripeForm";
import { CartListItemCompact } from "@/ui/components/cart/CartListItemCompact";

export default async function PaymentPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

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
      userId: user.id,
      email:
        user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress ||
        user.emailAddresses[0]?.emailAddress ||
        null,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Missing client_secret");
  }

  return (
    <section>
      <div className="flex items-start justify-center gap-8 py-8">
        <div className="card bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-3xl">Payment</h1>
            <ul className="flex flex-1 flex-col gap-2 bg-base-100">
              {cart.items.map((item, index) => (
                <CartListItemCompact key={item.id} {...item} className={clsx({ "border-t": index !== 0 })} />
              ))}
            </ul>
          </div>
        </div>
        <Suspense>
          <StripeForm clientSecret={paymentIntent.client_secret} userId={user.id} orderId={cart.id} />
        </Suspense>
      </div>
    </section>
  );
}
