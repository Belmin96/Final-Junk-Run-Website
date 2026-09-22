"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { JobStatus } from "@prisma/client";

// TEMPORARY testing aid, only rendered when NODE_ENV !== "production" (see
// the page that renders this and app/api/dev/simulate/route.ts). Lets you
// exercise the full customer journey before a real contractor app exists.
export default function DevSimulatePanel({
  jobId,
  status,
}: {
  jobId: string;
  status: JobStatus;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: string) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/dev/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Simulation step failed.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  return (
    <div
      className="dash-card"
      style={{ borderStyle: "dashed", borderColor: "#5aa0ff" }}
    >
      <h3 style={{ margin: "0 0 4px", color: "#5aa0ff" }}>
        Dev Testing Tools
      </h3>
      <p className="dash-sub" style={{ marginBottom: "10px" }}>
        No contractor app exists yet — use these to simulate contractor
        activity while testing. Hidden in production.
      </p>
      {error && <div className="dash-error">{error}</div>}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {(status === "AWAITING_ESTIMATES" || status === "ESTIMATES_RECEIVED") && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={busy}
            onClick={() => run("submit-estimate")}
          >
            Simulate Estimate
          </button>
        )}
        {status === "CONTRACTOR_SELECTED" && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={busy}
            onClick={() => run("start-progress")}
          >
            Simulate Job Started
          </button>
        )}
        {status === "IN_PROGRESS" && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={busy}
            onClick={() => run("complete")}
          >
            Simulate Job Completed
          </button>
        )}
      </div>
    </div>
  );
}
