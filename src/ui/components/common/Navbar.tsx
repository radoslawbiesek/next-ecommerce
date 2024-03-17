import "server-only";

import { Suspense } from "react";
import { type Route } from "next";
import NextLink from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { ActiveLink } from "@/ui/components/common/ActiveLink";
import { Search } from "@/ui/components/common/Search";
import * as categoriesService from "@/services/categories";
import { CartLink } from "@/ui/components/cart/CartLink";

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
    <div className="navbar bg-base-200 px-8 py-0">
      <nav className="navbar-start gap-2">
        <NextLink href="/" className="text-xl">
          Shop
        </NextLink>
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
      </nav>
      <div className="navbar-end gap-6">
        <Suspense>
          <Search />
        </Suspense>
        <CartLink />
        <SignedIn>
          <UserButton afterSignOutUrl="/" userProfileMode="navigation" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
