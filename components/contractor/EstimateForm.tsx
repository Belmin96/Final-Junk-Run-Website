"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EstimateForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const dollars = Number.parseFloat(amount);
    if (Number.isNaN(dollars) || dollars <= 0) {
      setError("Enter a valid dollar amount.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/contractor/jobs/${jobId}/estimates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: Math.round(dollars * 100),
          message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't submit your estimate. Try again.");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="dash-error">{error}</div>}

      <div className="dash-form-row">
        <label htmlFor="amount">Your estimate ($)</label>
        <input
          id="amount"
          className="dash-input"
          type="number"
          min="5"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          className="dash-textarea"
          placeholder="Availability, crew size, anything the customer should know..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Estimate"}
      </button>
    </form>
  );
}
