import type { Metadata } from "next";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import ProfileForm from "@/components/dashboard/ProfileForm";
import PaymentMethodCard from "@/components/dashboard/PaymentMethodCard";

export const metadata: Metadata = { title: "Profile & Payment" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const customer = await getOrCreateCustomer();

  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">Profile &amp; Payment</h1>
          <p className="dash-sub">
            Keep your contact details and payment method up to date.
          </p>
        </div>
      </div>

      <div className="dash-grid">
        <ProfileForm customer={customer} />
        <PaymentMethodCard
          brand={customer.defaultPaymentMethodBrand}
          last4={customer.defaultPaymentMethodLast4}
        />
      </div>
    </>
  );
}
