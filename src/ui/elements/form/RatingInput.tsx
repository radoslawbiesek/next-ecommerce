import clsx from "clsx";

type RatingInputProps = { label?: string; wrapperClassName?: string };

export function RatingInput({ label, wrapperClassName }: RatingInputProps) {
  return (
    <div className={clsx("form-control w-full max-w-xs", wrapperClassName)}>
      {label && (
        <div className="label">
          <span className="label-text-alt">{label}</span>
        </div>
      )}
      <div className="rating">
        <input type="radio" name="rating" value="1" className="mask mask-star-2" />
        <input type="radio" name="rating" value="2" className="mask mask-star-2" />
        <input type="radio" name="rating" value="3" className="mask mask-star-2" />
        <input type="radio" name="rating" value="4" className="mask mask-star-2" />
        <input type="radio" name="rating" value="5" className="mask mask-star-2" defaultChecked />
      </div>
    </div>
  );
}
