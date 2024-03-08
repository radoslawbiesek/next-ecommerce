"use client";

import { useRouter } from "next/navigation";

export function ContinueShoppingButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="btn btn-outline flex-1">
      Continue shopping
    </button>
  );
}
