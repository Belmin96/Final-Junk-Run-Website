"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Estimate, Contractor } from "@prisma/client";
import { formatCents, formatDateTime, estimateStatusBadgeClass, estimateStatusLabel } from "@/lib/format";

type EstimateWithContractor = Estimate & { contractor: Contractor };

export default function EstimateList({
  jobId,
  estimates,
  contractorChosen,
}: {
  jobId: string;
  estimates: EstimateWithContractor[];
  contractorChosen: boolean;
}) {
  const router = useRouter();
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function accept(estimateId: string) {
    setError(null);
    setAcceptingId(estimateId);
    try {
      const res = await fetch(
        `/api/jobs/${jobId}/estimates/${estimateId}/accept`,
        { method: "POST" }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't select that contractor. Try again.");
        setAcceptingId(null);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setAcceptingId(null);
    }
  }

  if (estimates.length === 0) {
    return (
      <div className="dash-empty">
        <p>No estimates yet — contractors typically respond within a day.</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="dash-error">{error}</div>}
      {estimates.map((estimate) => (
        <div className="dash-estimate-row" key={estimate.id}>
          <div>
            <div style={{ fontWeight: 700 }}>{estimate.contractor.businessName}</div>
            <div className="dash-sub">
              {estimate.message && <>{estimate.message} &middot; </>}
              Submitted {formatDateTime(estimate.createdAt)}
            </div>
            <span className={estimateStatusBadgeClass(estimate.status)} style={{ marginTop: "6px" }}>
              {estimateStatusLabel(estimate.status)}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span className="dash-estimate-amount">{formatCents(estimate.amountCents)}</span>
            {!contractorChosen && estimate.status === "PENDING" && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={acceptingId === estimate.id}
                onClick={() => accept(estimate.id)}
              >
                {acceptingId === estimate.id ? "Selecting…" : "Choose"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
