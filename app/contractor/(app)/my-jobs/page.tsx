import Link from "next/link";
import type { Metadata } from "next";
import type { Job } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { formatDate, jobStatusBadgeClass, jobStatusLabel } from "@/lib/format";

export const metadata: Metadata = { title: "My Jobs" };
export const dynamic = "force-dynamic";

export default async function ContractorMyJobsPage() {
  const contractor = await getOrCreateContractor();

  const jobs = await db.job.findMany({
    where: { chosenContractorId: contractor.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">My Jobs</h1>
          <p className="dash-sub">Jobs you&apos;ve won and are working.</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="dash-card">
          <div className="dash-empty">
            <p>You haven&apos;t won any jobs yet — check Open Jobs to submit estimates.</p>
            <Link href="/contractor" className="btn btn-primary">
              See Open Jobs
            </Link>
          </div>
        </div>
      ) : (
        <div className="dash-card" style={{ padding: 0 }}>
          {jobs.map((job: Job) => (
            <Link
              key={job.id}
              href={`/contractor/jobs/${job.id}`}
              className="dash-job-card"
            >
              <div>
                <div className="dash-job-card-title">{job.title}</div>
                <div className="dash-job-card-meta">
                  {job.city}, {job.state} &middot; Pickup {formatDate(job.pickupDate)}
                </div>
              </div>
              <span className={jobStatusBadgeClass(job.status)}>
                {jobStatusLabel(job.status)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
