"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// The contractor-side controls for a job they've won: Start -> Confirm
// Arrival (GPS) -> Mark Completed. See app/api/contractor/jobs/[jobId]/
// {start,arrive,complete}/route.ts and lib/timing.ts for the rules behind
// each step.
export default function ContractorJobPanel({
  jobId,
  startedAt,
  arrivedAt,
  minutesElapsed,
  reassignmentEligible,
}: {
  jobId: string;
  startedAt: Date | null;
  arrivedAt: Date | null;
  minutesElapsed: number | null;
  reassignmentEligible: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post(path: string, body?: unknown) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/contractor/jobs/${jobId}/${path}`, {
        method: "POST",
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const b = await res.json().catch(() => null);
        setError(b?.error || "That didn't work. Try again.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  function confirmArrival() {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError("Your browser doesn't support location — can't verify arrival.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        post("arrive", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Couldn't get your location. Check your browser's location permission and try again.");
        setBusy(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  if (!startedAt) {
    return (
      <div className="dash-card">
        <h3 style={{ marginTop: 0, fontSize: "16px" }}>Job Actions</h3>
        {error && <div className="dash-error">{error}</div>}
        <p className="dash-sub" style={{ marginBottom: "10px" }}>
          Let the customer know you&apos;re on your way.
        </p>
        <button type="button" className="btn btn-primary" disabled={busy} onClick={() => post("start")}>
          {busy ? "Starting…" : "Start Job"}
        </button>
      </div>
    );
  }

  if (!arrivedAt) {
    return (
      <div className="dash-card">
        <h3 style={{ marginTop: 0, fontSize: "16px" }}>Job Actions</h3>
        {error && <div className="dash-error">{error}</div>}
        {reassignmentEligible ? (
          <p style={{ color: "#ff6b6b", marginBottom: "10px" }}>
            It&apos;s been {Math.round(minutesElapsed ?? 0)} minutes since you started this
            job — the customer may reopen it to other contractors if you don&apos;t confirm
            arrival soon.
          </p>
        ) : (
          <p className="dash-sub" style={{ marginBottom: "10px" }}>
            Confirm you&apos;ve arrived at the job site. This checks your location against
            the job&apos;s address.
          </p>
        )}
        <button type="button" className="btn btn-primary" disabled={busy} onClick={confirmArrival}>
          {busy ? "Checking location…" : "Confirm Arrival"}
        </button>
      </div>
    );
  }

  return (
    <div className="dash-card">
      <h3 style={{ marginTop: 0, fontSize: "16px" }}>Job Actions</h3>
      {error && <div className="dash-error">{error}</div>}
      <p className="dash-sub" style={{ marginBottom: "10px" }}>
        Arrival confirmed. Mark the job complete once the work is done.
      </p>
      <button type="button" className="btn btn-primary" disabled={busy} onClick={() => post("complete")}>
        {busy ? "Completing…" : "Mark Job Completed"}
      </button>
    </div>
  );
}
