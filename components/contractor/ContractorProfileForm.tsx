"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Contractor } from "@prisma/client";

export default function ContractorProfileForm({ contractor }: { contractor: Contractor }) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState(contractor.businessName);
  const [phone, setPhone] = useState(contractor.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch("/api/contractor/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, phone }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't save your profile. Try again.");
        setSaving(false);
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="dash-error">{error}</div>}
      {saved && !error && (
        <div className="dash-sub" style={{ color: "var(--green)", marginBottom: "10px" }}>
          Saved.
        </div>
      )}

      <div className="dash-form-row">
        <label htmlFor="businessName">Business name</label>
        <input
          id="businessName"
          className="dash-input"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          maxLength={160}
          required
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          className="dash-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={20}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? "Saving…" : "Save Profile"}
      </button>
    </form>
  );
}
