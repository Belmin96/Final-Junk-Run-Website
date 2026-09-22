import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensures the Customer row exists in the database before any dashboard
  // page renders (see lib/getOrCreateCustomer.ts for why this is lazy).
  const customer = await getOrCreateCustomer();

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <Link href="/" className="logo" style={{ marginBottom: "8px" }}>
          <div className="logo-row">
            <svg
              width="26"
              height="16"
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
        </Link>

        <DashboardNav />

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingTop: "16px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <UserButton afterSignOutUrl="/" />
          <div style={{ fontSize: "13px", color: "var(--silver)", overflow: "hidden" }}>
            <div style={{ fontWeight: 700, color: "var(--white)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {customer.firstName ? `${customer.firstName} ${customer.lastName ?? ""}`.trim() : customer.email}
            </div>
            <div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {customer.email}
            </div>
          </div>
        </div>
      </aside>

      <div className="dash-content">{children}</div>
    </div>
  );
}
