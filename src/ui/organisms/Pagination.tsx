import "server-only";

import { type Route } from "next";
import Link from "next/link";

import clsx from "clsx";

type PaginationProps = {
  total: number;
  currentPage: number;
  perPage: number;
  generateHref: (page: number) => Route;
};

const SIBLINGS = 1;
const BOUNDARIES = 1;
const COUNT = 10;

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const DOTS = "...";
export function generatePages(count: number, total: number, currentPage: number): (string | number)[] {
  if (total <= count) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(currentPage - SIBLINGS, BOUNDARIES);
  const rightSiblingIndex = Math.min(currentPage + SIBLINGS, total - BOUNDARIES);

  const shouldShowLeftDots = leftSiblingIndex > BOUNDARIES + 2;
  const shouldShowRightDots = rightSiblingIndex < total - (BOUNDARIES + 1);

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 2 * SIBLINGS + BOUNDARIES + 2;
    return [...range(1, leftItemCount), DOTS, ...range(total - (BOUNDARIES - 1), total)];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 2 * SIBLINGS + BOUNDARIES + 1;
    return [...range(1, BOUNDARIES), DOTS, ...range(total - rightItemCount, total)];
  }

  return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, ...range(total - BOUNDARIES + 1, total)];
}

export function Pagination({ total, perPage, currentPage, generateHref }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const pages = generatePages(COUNT, totalPages, currentPage);

  return (
    <nav className="join" aria-label="Pagination">
      {pages.map((page, index) => {
        const baseClassName = "btn join-item";
        const isLink = typeof page === "number";

        if (!isLink) {
          return (
            <button disabled key={`${page}-${index}`} className={clsx(baseClassName, "btn-disabled")}>
              {page}
            </button>
          );
        }

        return (
          <Link
            key={page}
            className={clsx(baseClassName, { "btn-active": page === currentPage })}
            href={generateHref(page)}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}
