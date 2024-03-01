import "server-only";

import { Suspense } from "react";
import { type Route } from "next";
import Link from "next/link";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Search } from "@/ui/molecules/Search";
import * as categoriesService from "@/services/categories";
import { CartLink } from "@/ui/molecules/CartLink";

const BASE_LINKS = [
  { label: "Home", href: "/", exact: true },
  { label: "All", href: "/products", exact: false },
] as const;

export async function Navbar() {
  const categories = await categoriesService.getAll();

  const allLinks = [
    ...BASE_LINKS,
    ...(categories
      ? categories.map((c) => ({ label: c.name, href: `/categories/${c.slug}` as Route, exact: false }))
      : []),
  ] as const;

  return (
    <nav className="navbar bg-base-200 px-8 py-0">
      <div className="navbar-start gap-2">
        <Link href="/" className="text-xl">
          Shop
        </Link>
        <ul className="menu menu-horizontal px-4 py-0">
          {allLinks.map((link) => (
            <li key={link.href}>
              <ActiveLink
                href={link.href}
                className="rounded-none"
                activeClassName="border-b-2 border-slate-500"
                exact={link.exact}
              >
                {link.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <Suspense>
          <Search />
        </Suspense>
        <CartLink />
      </div>
    </nav>
  );
}
