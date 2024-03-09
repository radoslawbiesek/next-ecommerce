import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, type FormEvent } from "react";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/cart/payment/success",
      },
    });

    console.log(error);

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "Something went wrong");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  if (!stripe || !elements) {
    return null;
  }

  return (
    <div className="stripe card bg-base-200 p-4">
      <form id="payment-form" onSubmit={handleSubmit} className="card-body gap-4">
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary w-full">
          <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
