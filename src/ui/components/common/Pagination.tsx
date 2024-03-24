import "server-only";

import { type Route } from "next";
import clsx from "clsx";

import { ActiveLink } from "@/ui/components/common/ActiveLink";
import { range } from "@/helpers/range";

type PaginationProps = {
  total: number;
  currentPage: number;
  perPage: number;
  generateHref: (page: number) => Route;
};

const SIBLINGS = 1;
const BOUNDARIES = 1;
const COUNT = 10;

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
      {pages.map((page, index, pages) => {
        const baseClassName = clsx("btn btn-outline", { "join-item": pages.length > 1 });
        const isLink = typeof page === "number";

        if (!isLink) {
          return (
            <button disabled key={`${page}-${index}`} className={clsx(baseClassName, "btn-disabled")}>
              {page}
            </button>
          );
        }

        return (
          <ActiveLink key={page} className={baseClassName} activeClassName="btn-active" exact href={generateHref(page)}>
            {page}
          </ActiveLink>
        );
      })}
    </nav>
  );
}
