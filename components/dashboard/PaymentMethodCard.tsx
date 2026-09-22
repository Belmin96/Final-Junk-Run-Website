"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const cardElementOptions = {
  style: {
    base: {
      fontSize: "15px",
      color: "#f5f7f6",
      fontFamily: "inherit",
      "::placeholder": { color: "#8b978f" },
    },
    invalid: { color: "#ff6b6b" },
  },
};

function AddCardForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    try {
      const intentRes = await fetch("/api/stripe/setup-intent", { method: "POST" });
      if (!intentRes.ok) {
        setError("Couldn't start payment setup. Try again.");
        setSubmitting(false);
        return;
      }
      const { clientSecret } = await intentRes.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card details not found.");
        setSubmitting(false);
        return;
      }

      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
        clientSecret,
        { payment_method: { card: cardElement } }
      );

      if (stripeError) {
        setError(stripeError.message || "Card verification failed.");
        setSubmitting(false);
        return;
      }

      const paymentMethodId =
        typeof setupIntent?.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent?.payment_method?.id;

      if (!paymentMethodId) {
        setError("Couldn't verify the card. Try again.");
        setSubmitting(false);
        return;
      }

      const saveRes = await fetch("/api/stripe/default-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!saveRes.ok) {
        setError("Card verified but couldn't be saved. Try again.");
        setSubmitting(false);
        return;
      }

      onDone();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ marginTop: "14px" }}>
      {error && <div className="dash-error">{error}</div>}
      <div className="dash-input" style={{ paddingTop: "13px", paddingBottom: "13px" }}>
        <CardElement options={cardElementOptions} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button type="submit" className="btn btn-primary btn-sm" disabled={!stripe || submitting}>
          {submitting ? "Verifying…" : "Save Card"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PaymentMethodCard({
  brand,
  last4,
}: {
  brand: string | null;
  last4: string | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  if (!stripePromise) {
    return (
      <div className="dash-card">
        <h3 style={{ marginTop: 0, fontSize: "16px" }}>Payment Method</h3>
        <p className="dash-sub">
          Stripe isn&apos;t configured yet (missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).
        </p>
      </div>
    );
  }

  return (
    <div className="dash-card">
      <h3 style={{ marginTop: 0, fontSize: "16px" }}>Payment Method</h3>

      {brand && last4 ? (
        <p style={{ color: "var(--silver)" }}>
          {brand.charAt(0).toUpperCase() + brand.slice(1)} ending in {last4}
        </p>
      ) : (
        <p className="dash-sub">No payment method on file yet.</p>
      )}

      {editing ? (
        <Elements stripe={stripePromise}>
          <AddCardForm
            onDone={() => {
              setEditing(false);
              router.refresh();
            }}
            onCancel={() => setEditing(false)}
          />
        </Elements>
      ) : (
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ marginTop: "10px" }}
          onClick={() => setEditing(true)}
        >
          {brand ? "Update Card" : "Add Payment Method"}
        </button>
      )}
    </div>
  );
}
