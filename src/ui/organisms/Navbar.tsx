import "server-only";

import Link from "next/link";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Search } from "@/ui/molecules/Search";

const LINKS = [
  { label: "Home", href: "/", exact: true },
  { label: "All", href: "/products", exact: false },
  { label: "Categories", href: "/categories", exact: false },
  { label: "Collections", href: "/collections", exact: false },
] as const;

export function Navbar() {
  return (
    <nav className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Shop
        </Link>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} activeClassName="underline" exact={link.exact}>
                {link.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Search />
      </div>
    </nav>
  );
}
