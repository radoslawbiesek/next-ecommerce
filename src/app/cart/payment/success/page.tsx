import { CheckCircleIcon } from "@/ui/elements/icons/CheckCircleIcon";

export default async function PaymentSuccessPage() {
  return (
    <div role="alert" className="flex flex-grow flex-col items-center justify-center gap-4">
      <CheckCircleIcon className="h-20 w-20 text-green-600" />
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-xl font-bold">Your purchase has been confirmed!</h3>
        <p>You can check its status on the orders page.</p>
      </div>
    </div>
  );
}
