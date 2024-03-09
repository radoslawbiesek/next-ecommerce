import { CheckCircleIcon } from "@/ui/elements/icons/CheckCircleIcon";

export default function PaymentSuccessPage() {
  return (
    <div role="alert" className="alert alert-success">
      <CheckCircleIcon />
      <span>Your purchase has been confirmed!</span>
    </div>
  );
}
