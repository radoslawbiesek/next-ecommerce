import { Suspense } from "react";
import { type Route } from "next";
import NextLink from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { ActiveLink } from "@/ui/components/common/ActiveLink";
import { Search } from "@/ui/components/common/Search";
import * as categoriesService from "@/services/categories";
import { CartLink } from "@/ui/components/cart/CartLink";
import { TruckIcon } from "@/ui/elements/icons/TruckIcon";
import { StorefrontIcon } from "@/ui/elements/icons/StorefrontIcon";

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
    <div className="border-b-base-900 border-b bg-base-100 px-8 py-2">
      <div className="container navbar mx-auto">
        <div className="navbar-start">
          <NextLink href="/" className="flex items-center gap-2 text-xl">
            <StorefrontIcon className="h-7 w-7" />
            <span className="text-xl font-semibold">Next Ecommerce</span>
          </NextLink>
        </div>
        <nav className="navbar-center gap-2">
          <ul className="menu menu-horizontal px-4 py-0">
            {allLinks.map((link) => (
              <li key={link.href}>
                <ActiveLink
                  href={link.href}
                  className="h-full rounded-none"
                  activeClassName="border-b-2 border-primary"
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
            <NextLink href="/orders">
              <TruckIcon className="h-7 w-7" />
            </NextLink>
            <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
