"use client";

import { useState } from "react";
import type { Customer } from "@prisma/client";

export default function ProfileForm({ customer }: { customer: Customer }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      phone: String(data.get("phone") || ""),
      addressLine1: String(data.get("addressLine1") || ""),
      addressLine2: String(data.get("addressLine2") || ""),
      city: String(data.get("city") || ""),
      state: String(data.get("state") || ""),
      zip: String(data.get("zip") || ""),
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't save your profile. Try again.");
        setSubmitting(false);
        return;
      }
      setSaved(true);
      setSubmitting(false);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="dash-card">
      <h3 style={{ marginTop: 0, fontSize: "16px" }}>Your Details</h3>

      <div className="dash-form-grid-2">
        <div className="dash-form-row">
          <label>Name</label>
          <input
            className="dash-input"
            value={[customer.firstName, customer.lastName].filter(Boolean).join(" ") || "—"}
            disabled
          />
        </div>
        <div className="dash-form-row">
          <label>Email</label>
          <input className="dash-input" value={customer.email} disabled />
        </div>
      </div>
      <p className="dash-sub" style={{ marginTop: "-8px", marginBottom: "16px" }}>
        Name and email are managed through your account settings (top right).
      </p>

      {error && <div className="dash-error">{error}</div>}
      {saved && (
        <div style={{ color: "var(--green)", fontSize: "13px", marginBottom: "8px" }}>
          Saved.
        </div>
      )}

      <div className="dash-form-row">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          className="dash-input"
          defaultValue={customer.phone ?? ""}
          placeholder="(555) 555-5555"
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="addressLine1">Address</label>
        <input
          id="addressLine1"
          name="addressLine1"
          className="dash-input"
          defaultValue={customer.addressLine1 ?? ""}
          placeholder="Street address"
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="addressLine2">Apt / unit (optional)</label>
        <input
          id="addressLine2"
          name="addressLine2"
          className="dash-input"
          defaultValue={customer.addressLine2 ?? ""}
        />
      </div>

      <div className="dash-form-grid-2">
        <div className="dash-form-row">
          <label htmlFor="city">City</label>
          <input id="city" name="city" className="dash-input" defaultValue={customer.city ?? ""} />
        </div>
        <div className="dash-form-row">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            className="dash-input"
            maxLength={2}
            defaultValue={customer.state ?? ""}
            style={{ textTransform: "uppercase" }}
          />
        </div>
      </div>

      <div className="dash-form-row">
        <label htmlFor="zip">ZIP code</label>
        <input id="zip" name="zip" className="dash-input" defaultValue={customer.zip ?? ""} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
