"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { CheckoutForm } from "./CheckoutForm";

type StripeFormProps = {
  clientSecret: string;
  orderId: number;
  userId: string;
};

export const StripeForm = ({ clientSecret, orderId, userId }: StripeFormProps) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable");
  }

  return (
    <Elements
      options={{ appearance: { theme: "stripe" }, clientSecret }}
      stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)}
    >
      <CheckoutForm orderId={orderId} userId={userId} />
    </Elements>
  );
};
