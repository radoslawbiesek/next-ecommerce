"use client";

import { useRouter } from "next/navigation";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, type FormEvent } from "react";

import { Spinner } from "@/ui/elements/form/Spinner";
import * as cartActions from "@/actions/cart";
import * as ordersActions from "@/actions/orders";

type CheckoutFormProps = {
  userId: string;
  orderId: number;
};

export function CheckoutForm({ userId, orderId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      })
      .catch(console.error);
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      console.log(paymentIntent);

      if (error) {
        throw new Error(error.message);
      }

      await ordersActions.update(orderId, "payment_started", userId);
      await cartActions.removeFromCookies();

      router.push("/cart/payment/success");
    } catch (err: unknown) {
      console.log(err);
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!stripe || !elements) {
    return null;
  }

  return (
    <div className="stripe card bg-base-200 p-4">
      <form id="payment-form" onSubmit={handleSubmit} className="card-body gap-4">
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary w-full">
          <span id="button-text">{isLoading ? <Spinner /> : "Pay now"}</span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
