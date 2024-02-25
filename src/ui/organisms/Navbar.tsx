import "server-only";

import { Suspense } from "react";
import { type Route } from "next";
import Link from "next/link";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Search } from "@/ui/molecules/Search";
import * as categoriesService from "@/services/categories";

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
    <nav className="navbar bg-base-200 px-8">
      <div className="navbar-start">
        <Link href="/" className="text-xl">
          Shop
        </Link>
        <ul className="menu menu-horizontal px-4">
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
      <div className="navbar-end">
        <Suspense>
          <Search />
        </Suspense>
      </div>
    </nav>
  );
}
