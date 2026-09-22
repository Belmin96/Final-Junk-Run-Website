import Link from "next/link";
import type { Metadata } from "next";
import type { Job, Estimate } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Open Jobs" };
export const dynamic = "force-dynamic";

type OpenJob = Job & { estimates: Estimate[] };

export default async function ContractorOpenJobsPage() {
  const contractor = await getOrCreateContractor();

  const jobs: OpenJob[] = await db.job.findMany({
    where: { status: { in: ["AWAITING_ESTIMATES", "ESTIMATES_RECEIVED"] } },
    orderBy: { createdAt: "desc" },
    include: { estimates: true },
  });

  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">Open Jobs</h1>
          <p className="dash-sub">Jobs waiting on estimates from contractors.</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="dash-card">
          <div className="dash-empty">
            <p>No open jobs right now — check back soon.</p>
          </div>
        </div>
      ) : (
        <div className="dash-card" style={{ padding: 0 }}>
          {jobs.map((job) => {
            const alreadyBid = job.estimates.some(
              (e) => e.contractorId === contractor.id
            );
            return (
              <Link
                key={job.id}
                href={`/contractor/jobs/${job.id}`}
                className="dash-job-card"
              >
                <div>
                  <div className="dash-job-card-title">{job.title}</div>
                  <div className="dash-job-card-meta">
                    {job.city}, {job.state} &middot; Pickup {formatDate(job.pickupDate)}
                    {" "}&middot; {job.estimates.length} estimate
                    {job.estimates.length === 1 ? "" : "s"} so far
                  </div>
                </div>
                {alreadyBid && (
                  <span className="dash-badge status-pending">Estimate Submitted</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
