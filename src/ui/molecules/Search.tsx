"use client";

import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GlassIcon } from "../atoms/GlassIcon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<F extends (...args: any[]) => void>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout;

  return function debounced(...args: Parameters<F>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = debounce((search: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", search);
    const path = `/search?${params.toString()}` satisfies Route;

    if (pathname === "/search") {
      router.replace(path);
    } else {
      router.push(path);
    }
  }, 500);

  return (
    <div className="form-control">
      <label className="input input-md input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search products..."
          aria-label="search"
          role="searchbox"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query") || ""}
        />
        <GlassIcon className="h-4 w-4" />
      </label>
    </div>
  );
}
