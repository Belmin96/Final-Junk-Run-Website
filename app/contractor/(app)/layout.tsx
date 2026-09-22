import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import ContractorNav from "@/components/contractor/ContractorNav";

// Mirrors app/dashboard/layout.tsx (the customer side) -- same shell,
// different nav links and a Contractor row instead of a Customer row.
export default async function ContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contractor = await getOrCreateContractor();

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

        <ContractorNav />

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
              {contractor.businessName}
            </div>
            <div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {contractor.email}
            </div>
          </div>
        </div>
      </aside>

      <div className="dash-content">{children}</div>
    </div>
  );
}
