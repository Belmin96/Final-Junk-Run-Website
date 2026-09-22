"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Shown on a customer's job detail page while a job is IN_PROGRESS: the
// 45-minute contractor timing banner (see lib/timing.ts) and, once the
// contractor is officially late, a button to reopen the job to other
// contractors.
export default function ArrivalStatus({
  jobId,
  minutesElapsed,
  warning,
  reassignmentEligible,
  arrivedAt,
  arrivalVerified,
}: {
  jobId: string;
  minutesElapsed: number | null;
  warning: boolean;
  reassignmentEligible: boolean;
  arrivedAt: Date | null;
  arrivalVerified: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reassign() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/reassign`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't reopen this job. Try again.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  if (arrivedAt) {
    if (!arrivalVerified) {
      return (
        <div className="dash-card" style={{ borderColor: "#e0a63a" }}>
          <p style={{ margin: 0, color: "#e0a63a" }}>
            Your contractor confirmed arrival, but their reported location
            didn&apos;t match the job address closely enough to auto-verify.
            This can happen with imprecise GPS or geocoding — reach out to
            them directly if anything seems off.
          </p>
        </div>
      );
    }
    return null; // arrived + verified — nothing to flag
  }

  if (!warning || minutesElapsed == null) return null;

  return (
    <div className="dash-card" style={{ borderColor: reassignmentEligible ? "#ff6b6b" : "#e0a63a" }}>
      {error && <div className="dash-error">{error}</div>}
      {reassignmentEligible ? (
        <>
          <p style={{ margin: "0 0 10px", color: "#ff6b6b" }}>
            It&apos;s been {Math.round(minutesElapsed)} minutes since your
            contractor started this job and they haven&apos;t confirmed
            arrival. You can reopen this job to other contractors.
          </p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={busy}
            onClick={reassign}
          >
            {busy ? "Reopening…" : "Reopen to Other Contractors"}
          </button>
        </>
      ) : (
        <p style={{ margin: 0, color: "#e0a63a" }}>
          Your contractor started this job {Math.round(minutesElapsed)} minutes
          ago and hasn&apos;t confirmed arrival yet.
        </p>
      )}
    </div>
  );
}
