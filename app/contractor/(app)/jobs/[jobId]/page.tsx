import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { JobPhoto } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { formatDate, formatCents, jobStatusBadgeClass, jobStatusLabel } from "@/lib/format";
import { getArrivalTiming } from "@/lib/timing";
import EstimateForm from "@/components/contractor/EstimateForm";
import ContractorJobPanel from "@/components/contractor/ContractorJobPanel";

export const metadata: Metadata = { title: "Job Details" };
export const dynamic = "force-dynamic";

export default async function ContractorJobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const contractor = await getOrCreateContractor();

  const job = await db.job.findUnique({
    where: { id: jobId },
    include: {
      photos: true,
      estimates: { where: { contractorId: contractor.id } },
    },
  });

  if (!job) notFound();

  const isChosen = job.chosenContractorId === contractor.id;
  const myEstimate = job.estimates[0] ?? null;
  const canBid =
    !isChosen &&
    !myEstimate &&
    (job.status === "AWAITING_ESTIMATES" || job.status === "ESTIMATES_RECEIVED");

  // Privacy: full street address only shown once this contractor has won
  // the job. Everyone else (browsing open jobs, or an estimate that wasn't
  // chosen) only sees city/state/zip -- enough to judge distance without
  // exposing the exact address to every bidder.
  const showFullAddress = isChosen;
  const timing = getArrivalTiming(job);

  return (
    <>
      <div className="dash-header-row">
        <div>
          <Link
            href={isChosen ? "/contractor/my-jobs" : "/contractor"}
            className="dash-sub"
            style={{ display: "inline-block", marginBottom: "6px" }}
          >
            ← Back
          </Link>
          <h1 className="dash-h1">{job.title}</h1>
          <p className="dash-sub">
            {showFullAddress
              ? `${job.pickupAddressLine1}${job.pickupAddressLine2 ? `, ${job.pickupAddressLine2}` : ""}, `
              : ""}
            {job.city}, {job.state} {job.zip} &middot; Pickup {formatDate(job.pickupDate)}
          </p>
        </div>
        <span className={jobStatusBadgeClass(job.status)}>{jobStatusLabel(job.status)}</span>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h3 style={{ marginTop: 0, fontSize: "16px" }}>Details</h3>
          <p style={{ color: "var(--silver)", lineHeight: 1.6 }}>{job.description}</p>

          {job.photos.length > 0 && (
            <div className="dash-photo-grid" style={{ marginTop: "12px" }}>
              {job.photos.map((photo: JobPhoto) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={photo.id}
                  src={`/api/photos/${photo.r2Key}`}
                  alt={photo.caption ?? "Job photo"}
                  className="dash-photo-thumb"
                />
              ))}
            </div>
          )}
        </div>

        {isChosen ? (
          <ContractorJobPanel
            jobId={job.id}
            startedAt={job.startedAt}
            arrivedAt={job.arrivedAt}
            minutesElapsed={timing.minutesElapsed}
            reassignmentEligible={timing.reassignmentEligible}
          />
        ) : myEstimate ? (
          <div className="dash-card">
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Your Estimate</h3>
            <p style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 6px" }}>
              {formatCents(myEstimate.amountCents)}
            </p>
            <p className="dash-sub">
              {myEstimate.status === "PENDING"
                ? "Waiting on the customer to choose a contractor."
                : myEstimate.status === "ACCEPTED"
                  ? "The customer chose you! Check My Jobs to get started."
                  : "The customer went with a different contractor for this job."}
            </p>
          </div>
        ) : canBid ? (
          <div className="dash-card">
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Submit an Estimate</h3>
            <EstimateForm jobId={job.id} />
          </div>
        ) : (
          <div className="dash-card">
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Not Available</h3>
            <p className="dash-sub">
              This job is no longer open for estimates.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
