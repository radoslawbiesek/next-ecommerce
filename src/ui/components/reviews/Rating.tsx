import clsx from "clsx";

import { MAX_RATING } from "@/contants";

type RatingProps = {
  value: number;
  className?: string;
};

export function Rating({ value, className }: RatingProps) {
  return (
    <div className={clsx(className, "flex items-center p-1")}>
      <div className="mr-2 mt-0.5 text-xs font-semibold" data-testid="product-rating">
        {Number.isInteger(value) ? value : value.toFixed(1)} / {MAX_RATING}
      </div>
      <div className={"rating rating-sm"}>
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <input
            type="radio"
            key={index}
            className={clsx("mask mask-star-2", index + 1 > Math.round(value) ? "bg-slate-300" : "")}
            disabled
          />
        ))}
      </div>
    </div>
  );
}
