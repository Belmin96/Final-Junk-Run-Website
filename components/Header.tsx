"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
            <a
              href="#"
              className="btn btn-outline btn-sm"
              onClick={(e) => e.preventDefault()}
            >
              Log In
            </a>
            <a
              href="#"
              className="btn btn-primary btn-sm"
              onClick={(e) => e.preventDefault()}
            >
              Get Started →
            </a>
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            className="btn btn-primary"
            style={{ marginTop: "14px", justifyContent: "center" }}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
