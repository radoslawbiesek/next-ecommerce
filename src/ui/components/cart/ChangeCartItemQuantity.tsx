"use client";

import { useOptimistic } from "react";

import * as cartActions from "@/actions/cart";

type ChangeCartItemQuantityProps = {
  cartItemId: number;
  quantity: number;
};

export function ChangeCartItemQuantity({ cartItemId, quantity }: ChangeCartItemQuantityProps) {
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
    quantity,
    (_currentState, optimisticQuantity: number) => optimisticQuantity,
  );

  const decrement = async () => {
    setOptimisticQuantity(optimisticQuantity - 1);
    await cartActions.changeItemQuantity(cartItemId, optimisticQuantity - 1);
  };

  const increment = async () => {
    setOptimisticQuantity(optimisticQuantity + 1);
    await cartActions.changeItemQuantity(cartItemId, optimisticQuantity + 1);
  };

  return (
    <form>
      <div className="join">
        <button className="btn join-item" formAction={decrement} data-testid="decrement">
          -
        </button>
        <div className="join-items flex items-center px-6" data-testid="quantity">
          {optimisticQuantity}
        </div>
        <button className="btn join-item" formAction={increment} data-testid="increment">
          +
        </button>
      </div>
    </form>
  );
}
