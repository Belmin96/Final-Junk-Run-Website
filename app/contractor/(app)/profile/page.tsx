import type { Metadata } from "next";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import ContractorProfileForm from "@/components/contractor/ContractorProfileForm";

export const metadata: Metadata = { title: "Contractor Profile" };
export const dynamic = "force-dynamic";

export default async function ContractorProfilePage() {
  const contractor = await getOrCreateContractor();

  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">Profile</h1>
          <p className="dash-sub">How customers see your business.</p>
        </div>
      </div>

      <div className="dash-card">
        <ContractorProfileForm contractor={contractor} />
      </div>
    </>
  );
}
