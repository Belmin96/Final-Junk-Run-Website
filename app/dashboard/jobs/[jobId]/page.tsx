import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Estimate, JobPhoto } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { formatDate, jobStatusBadgeClass, jobStatusLabel } from "@/lib/format";
import JobTimeline from "@/components/dashboard/JobTimeline";
import EstimateList from "@/components/dashboard/EstimateList";
import PaymentPanel from "@/components/dashboard/PaymentPanel";
import ReviewForm from "@/components/dashboard/ReviewForm";
import DevSimulatePanel from "@/components/dashboard/DevSimulatePanel";

export const metadata: Metadata = { title: "Job Details" };
export const dynamic = "force-dynamic";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const customer = await getOrCreateCustomer();

  const job = await db.job.findUnique({
    where: { id: jobId },
    include: {
      photos: true,
      estimates: { include: { contractor: true }, orderBy: { amountCents: "asc" } },
      chosenContractor: true,
      payment: true,
      review: true,
    },
  });

  if (!job || job.customerId !== customer.id) {
    notFound();
  }

  const acceptedEstimate = job.estimates.find(
    (e: Estimate) => e.status === "ACCEPTED"
  );
  const contractorChosen = Boolean(job.chosenContractorId);
  const showEstimates = !contractorChosen && job.status !== "CANCELLED";

  return (
    <>
      <div className="dash-header-row">
        <div>
          <Link href="/dashboard" className="dash-sub" style={{ display: "inline-block", marginBottom: "6px" }}>
            ← Back to My Jobs
          </Link>
          <h1 className="dash-h1">{job.title}</h1>
          <p className="dash-sub">
            {job.pickupAddressLine1}
            {job.pickupAddressLine2 ? `, ${job.pickupAddressLine2}` : ""}, {job.city}, {job.state} {job.zip} &middot; Pickup {formatDate(job.pickupDate)}
          </p>
        </div>
        <span className={jobStatusBadgeClass(job.status)}>{jobStatusLabel(job.status)}</span>
      </div>

      {process.env.NODE_ENV !== "production" && job.status !== "COMPLETED" && job.status !== "CANCELLED" && (
        <DevSimulatePanel jobId={job.id} status={job.status} />
      )}

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
                  src={photo.dataUrl}
                  alt={photo.caption ?? "Job photo"}
                  className="dash-photo-thumb"
                />
              ))}
            </div>
          )}
        </div>

        <div className="dash-card">
          <h3 style={{ marginTop: 0, fontSize: "16px" }}>Progress</h3>
          <JobTimeline status={job.status} />
        </div>
      </div>

      {showEstimates && (
        <div className="dash-card">
          <h3 style={{ marginTop: 0, fontSize: "16px" }}>Estimates</h3>
          <EstimateList
            jobId={job.id}
            estimates={job.estimates}
            contractorChosen={contractorChosen}
          />
        </div>
      )}

      {job.chosenContractor && (
        <div className="dash-card">
          <h3 style={{ marginTop: 0, fontSize: "16px" }}>Your Contractor</h3>
          <p style={{ margin: 0 }}>
            <strong>{job.chosenContractor.businessName}</strong>
            {job.chosenContractor.avgRating != null && (
              <span className="dash-sub"> &middot; {job.chosenContractor.avgRating.toFixed(1)}★ average rating</span>
            )}
          </p>
          {job.chosenContractor.phone && (
            <p className="dash-sub" style={{ marginTop: "4px" }}>{job.chosenContractor.phone}</p>
          )}
        </div>
      )}

      {job.status === "COMPLETED" && acceptedEstimate && (
        <PaymentPanel
          jobId={job.id}
          amountCents={acceptedEstimate.amountCents}
          payment={job.payment}
          hasPaymentMethod={Boolean(customer.defaultPaymentMethodId)}
        />
      )}

      {job.status === "COMPLETED" && job.payment?.status === "SUCCEEDED" && job.chosenContractor && (
        job.review ? (
          <div className="dash-card">
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Your Review</h3>
            <div className="dash-stars" aria-hidden>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={n <= job.review!.rating ? "filled" : undefined} style={{ color: n <= job.review!.rating ? "var(--green)" : "var(--line)", fontSize: "20px" }}>★</span>
              ))}
            </div>
            {job.review.comment && <p style={{ color: "var(--silver)", marginTop: "8px" }}>{job.review.comment}</p>}
          </div>
        ) : (
          <ReviewForm jobId={job.id} contractorName={job.chosenContractor.businessName} />
        )
      )}
    </>
  );
}
