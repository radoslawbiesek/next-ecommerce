"use client";

import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

function checkIsActive(pathname: string, href: string, exact: boolean) {
  if (exact) {
    return pathname === href;
  }

  return pathname.startsWith(href);
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
