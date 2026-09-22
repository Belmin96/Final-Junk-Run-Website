import type { JobStatus } from "@prisma/client";

const STEPS: { status: JobStatus; label: string }[] = [
  { status: "AWAITING_ESTIMATES", label: "Posted" },
  { status: "ESTIMATES_RECEIVED", label: "Estimates In" },
  { status: "CONTRACTOR_SELECTED", label: "Contractor Chosen" },
  { status: "IN_PROGRESS", label: "In Progress" },
  { status: "COMPLETED", label: "Completed" },
];

// Where each status falls along the steps above, for statuses that don't
// appear in STEPS directly (DRAFT counts as "before everything",
// CANCELLED is rendered separately by the caller).
const STEP_INDEX: Record<JobStatus, number> = {
  DRAFT: -1,
  AWAITING_ESTIMATES: 0,
  ESTIMATES_RECEIVED: 1,
  CONTRACTOR_SELECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  CANCELLED: -1,
};

export default function JobTimeline({ status }: { status: JobStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="dash-badge status-cancelled" style={{ marginBottom: "8px" }}>
        Job Cancelled
      </div>
    );
  }

  const currentIndex = STEP_INDEX[status];

  return (
    <div className="dash-timeline">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        return (
          <div
            className={`dash-timeline-step${done ? " done" : ""}`}
            key={step.status}
          >
            <span className="dash-timeline-dot" />
            <span className="dash-timeline-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
