import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="strip">
        <div className="smoke">
          <span
            className="s3"
            style={{
              width: "280px",
              height: "280px",
              left: "20%",
              top: "-140px",
            }}
          />
        </div>
        <div className="wrap">
          <div className="strip-items">
            <div className="strip-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M20 5c-8 0-14 6-14 14 8 0 14-6 14-14z" />
                <path d="M6 19c0-4 2-7 5-9" />
              </svg>
              Cleaner Environments
            </div>
            <div className="strip-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <circle cx="18" cy="9" r="2.6" />
                <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.8" />
              </svg>
              Stronger Communities
            </div>
            <div className="strip-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
              </svg>
              Trusted Professionals
            </div>
            <div className="strip-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M4 20V10M10 20V4M16 20v-7M22 20v-4" />
              </svg>
              Real Progress
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div className="strip-divider" />
            <div className="strip-script script">
              Real People. Real Progress.
            </div>
          </div>
        </div>
      </div>
      <div className="legal-footer">
        <div className="wrap">
          <span>
            © 2026 BSJ Innovation LLC · JunkRunApp.com · Independent service
            providers; not employees.
          </span>
          <ul className="legal-links">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <button type="button">Privacy</button>
            </li>
            <li>
              <Link href="/terms#contractor-agreement">
                Contractor Agreement
              </Link>
            </li>
            <li>
              <Link href="/terms#customer-agreement">Customer Agreement</Link>
            </li>
            <li>
              <Link href="/terms#prohibited-items">Prohibited Items</Link>
            </li>
            <li>
              <Link href="/terms#refund-policy">Refund Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
