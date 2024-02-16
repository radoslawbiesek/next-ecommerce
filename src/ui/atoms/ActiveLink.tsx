"use client";

import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

function checkIsActive(pathname: string, href: string, exact: boolean) {
  if (exact) {
    return pathname === href;
  }

  return pathname.split("/")[1] === href.split("/")[1];
}

type ActiveLinkProps = {
  href: Route;
  className?: string;
  activeClassName: string;
  exact?: boolean;
  children: React.ReactNode;
};
export function ActiveLink({ href, children, className, activeClassName, exact = false }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = checkIsActive(pathname, href, exact);

  return (
    <Link href={href} className={clsx(className, { [activeClassName]: isActive })} aria-current={isActive}>
      {children}
    </Link>
  );
}
