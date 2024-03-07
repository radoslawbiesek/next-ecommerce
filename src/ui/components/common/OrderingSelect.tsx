"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const ORDERING_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price", label: "Price (Low to High)", testId: "sort-by-price" },
  { value: "-price", label: "Price (High to Low)", testId: "sort-by-price" },
  { value: "rating", label: "Rating (Low to High)", testId: "sort-by-rating" },
  { value: "-rating", label: "Rating (High to Low)", testId: "sort-by-rating" },
] as const;

export function OrderingSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (params.has("ordering")) {
      params.delete("ordering");
    }
    params.set("ordering", e.target.value);

    const currentPath = pathname.split("/");
    currentPath[currentPath.length - 1] = "1";

    const path = `${currentPath.join("/")}?${params.toString()}`;
    router.push(path);
  };

  return (
    <label className="flex items-center">
      <div className="label mr-2">
        <span className="label-text">Sort by</span>
      </div>
      <select
        className="select select-bordered select-sm max-w-xs"
        value={searchParams.get("ordering") || ""}
        onChange={onChange}
      >
        {ORDERING_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            {...("testId" in option ? { "data-testid": option.testId } : {})}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
