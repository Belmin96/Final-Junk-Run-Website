import type { Job } from "@prisma/client";

// The contractor timing/reassignment rule (per the business spec): once a
// contractor starts a job, they get 30 minutes before a "running late"
// warning shows, then another 15 minutes (45 total) before the job becomes
// eligible for the customer to reopen it to other contractors.
export const GRACE_MINUTES_WARNING = 30;
export const GRACE_MINUTES_REASSIGN = 45;

// How close (in meters) a contractor's reported GPS position must be to the
// job's geocoded address to count as a verified arrival. 500m is generous
// enough to absorb normal GPS drift and imprecise geocoding while still
// catching "arrived" taps from somewhere else entirely.
export const ARRIVAL_RADIUS_METERS = 500;

export type ArrivalTiming = {
  /** Minutes since the contractor started the job (null if not started). */
  minutesElapsed: number | null;
  /** 30+ minutes since start, not yet arrived. */
  warning: boolean;
  /** 45+ minutes since start, not yet arrived -- customer can reassign. */
  reassignmentEligible: boolean;
};

export function getArrivalTiming(
  job: Pick<Job, "startedAt" | "arrivedAt">
): ArrivalTiming {
  if (!job.startedAt || job.arrivedAt) {
    return { minutesElapsed: null, warning: false, reassignmentEligible: false };
  }

  const minutesElapsed = (Date.now() - job.startedAt.getTime()) / 60_000;

  return {
    minutesElapsed,
    warning: minutesElapsed >= GRACE_MINUTES_WARNING,
    reassignmentEligible: minutesElapsed >= GRACE_MINUTES_REASSIGN,
  };
}

// Haversine distance between two lat/lng points, in meters.
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371_000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
