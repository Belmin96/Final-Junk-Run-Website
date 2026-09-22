"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/contractor", label: "Open Jobs", exact: true },
  { href: "/contractor/my-jobs", label: "My Jobs" },
  { href: "/contractor/profile", label: "Profile" },
];

export default function ContractorNav() {
  const pathname = usePathname();

  return (
    <nav className="dash-sidebar-nav">
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`dash-nav-link${active ? " active" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
