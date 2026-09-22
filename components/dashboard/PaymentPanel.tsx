"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import type { Payment } from "@prisma/client";
import { formatCents, paymentStatusBadgeClass, paymentStatusLabel } from "@/lib/format";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function PaymentPanel({
  jobId,
  amountCents,
  payment,
  hasPaymentMethod,
}: {
  jobId: string;
  amountCents: number;
  payment: Payment | null;
  hasPaymentMethod: boolean;
}) {
  const router = useRouter();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (payment?.status === "SUCCEEDED") {
    return (
      <div className="dash-card">
        <div className="dash-header-row">
          <div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>Payment</h3>
            <p className="dash-sub">{formatCents(payment.amountCents)} paid</p>
          </div>
          <span className={paymentStatusBadgeClass(payment.status)}>
            {paymentStatusLabel(payment.status)}
          </span>
        </div>
        {payment.receiptUrl && (
          <a
            href={payment.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{ marginTop: "10px" }}
          >
            View Receipt
          </a>
        )}
      </div>
    );
  }

  async function pay() {
    setError(null);
    setPaying(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/pay`, { method: "POST" });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        setError(body?.error || "Payment failed. Please try again.");
        setPaying(false);
        return;
      }

      if (body.status === "requires_action" && body.clientSecret) {
        const stripe = await stripePromise;
        if (!stripe) {
          setError("Payment requires additional verification but Stripe isn't configured.");
          setPaying(false);
          return;
        }
        const { error: confirmError } = await stripe.confirmCardPayment(body.clientSecret);
        if (confirmError) {
          setError(confirmError.message || "Payment verification failed.");
          setPaying(false);
          return;
        }
      }

      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setPaying(false);
    }
  }

  return (
    <div className="dash-card">
      <div className="dash-header-row">
        <div>
          <h3 style={{ margin: 0, fontSize: "16px" }}>Payment</h3>
          <p className="dash-sub">{formatCents(amountCents)} due</p>
        </div>
        {payment && (
          <span className={paymentStatusBadgeClass(payment.status)}>
            {paymentStatusLabel(payment.status)}
          </span>
        )}
      </div>

      {error && <div className="dash-error">{error}</div>}

      {!hasPaymentMethod ? (
        <p className="dash-sub" style={{ marginTop: "10px" }}>
          Add a payment method on your{" "}
          <a href="/dashboard/profile">profile</a> to pay for this job.
        </p>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          disabled={paying}
          onClick={pay}
          style={{ marginTop: "10px" }}
        >
          {paying ? "Processing…" : `Pay ${formatCents(amountCents)}`}
        </button>
      )}
    </div>
  );
}
