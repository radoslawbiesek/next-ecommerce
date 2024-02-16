import "server-only";

import Link from "next/link";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
] as const;

export function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Shop
        </Link>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} activeClassName="underline">
                {link.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
