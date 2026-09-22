"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "My Jobs", exact: true },
  { href: "/dashboard/jobs/new", label: "Post a Job" },
  { href: "/dashboard/profile", label: "Profile & Payment" },
];

export default function DashboardNav() {
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
