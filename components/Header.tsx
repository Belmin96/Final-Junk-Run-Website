"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrap">
        <nav>
          <Link href="/" className="logo">
            <div className="logo-row">
              <svg
                width="30"
                height="18"
                viewBox="0 0 34 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 17L9 5L13.5 11L20 2L28 17"
                  stroke="#7ED321"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="logo-word">
                JUNK<span className="run">RUN</span>
              </span>
            </div>
            <span className="logo-tag">JUNK REMOVAL MADE SIMPLE</span>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <SignedOut>
              <Link href="/sign-in" className="btn btn-outline btn-sm">
                Log In
              </Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">
                Get Started →
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn btn-outline btn-sm">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <div className="nav-slogan">
              CLEANER SPACES
              <br />
              STRONGER COMMUNITIES
            </div>
          </div>

          <button
            className="burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        <div className={`mobile-panel${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <SignedOut>
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="btn btn-outline"
              style={{ marginTop: "14px", justifyContent: "center" }}
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: "10px", justifyContent: "center" }}
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: "14px", justifyContent: "center" }}
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
