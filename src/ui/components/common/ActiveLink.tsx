"use client";

import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

function checkIsActive(pathname: string, href: string, exact: boolean) {
  const hrefWithoutQuery = href.split("?")[0]!;
  const pathnameWithoutQuery = pathname.split("?")[0]!;

  if (exact) {
    return pathnameWithoutQuery === hrefWithoutQuery;
  }

  return pathnameWithoutQuery.startsWith(hrefWithoutQuery);
}

type ActiveLinkProps = {
  children: React.ReactNode;
  href: Route;
  className?: string;
  activeClassName: string;
  exact?: boolean;
};

export function ActiveLink({ href, children, className, activeClassName, exact = false }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = checkIsActive(pathname, href, exact);

  return (
    <Link
      href={href}
      className={clsx(className, { [activeClassName]: isActive })}
      {...(isActive ? { "aria-current": true } : {})}
    >
      {children}
    </Link>
  );
}
