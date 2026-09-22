import type { JobStatus, EstimateStatus, PaymentStatus } from "@prisma/client";

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Draft",
  AWAITING_ESTIMATES: "Awaiting Estimates",
  ESTIMATES_RECEIVED: "Estimates Received",
  CONTRACTOR_SELECTED: "Contractor Selected",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

// Maps each enum value to a CSS modifier class defined in app/globals.css
// under `.dash-badge.status-*`.
const JOB_STATUS_CLASS: Record<JobStatus, string> = {
  DRAFT: "status-draft",
  AWAITING_ESTIMATES: "status-awaiting",
  ESTIMATES_RECEIVED: "status-received",
  CONTRACTOR_SELECTED: "status-selected",
  IN_PROGRESS: "status-progress",
  COMPLETED: "status-completed",
  CANCELLED: "status-cancelled",
};

export function jobStatusLabel(status: JobStatus): string {
  return JOB_STATUS_LABELS[status];
}

export function jobStatusBadgeClass(status: JobStatus): string {
  return `dash-badge ${JOB_STATUS_CLASS[status]}`;
}

const ESTIMATE_STATUS_LABELS: Record<EstimateStatus, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
};

const ESTIMATE_STATUS_CLASS: Record<EstimateStatus, string> = {
  PENDING: "status-pending",
  ACCEPTED: "status-completed",
  DECLINED: "status-cancelled",
};

export function estimateStatusLabel(status: EstimateStatus): string {
  return ESTIMATE_STATUS_LABELS[status];
}

export function estimateStatusBadgeClass(status: EstimateStatus): string {
  return `dash-badge ${ESTIMATE_STATUS_CLASS[status]}`;
}

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  SUCCEEDED: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

const PAYMENT_STATUS_CLASS: Record<PaymentStatus, string> = {
  PENDING: "status-pending",
  SUCCEEDED: "status-completed",
  FAILED: "status-cancelled",
  REFUNDED: "status-draft",
};

export function paymentStatusLabel(status: PaymentStatus): string {
  return PAYMENT_STATUS_LABELS[status];
}

export function paymentStatusBadgeClass(status: PaymentStatus): string {
  return `dash-badge ${PAYMENT_STATUS_CLASS[status]}`;
}
