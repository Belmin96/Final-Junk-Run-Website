import Link from "next/link";
import type { Metadata } from "next";
import type { Job, Estimate, Contractor, Payment } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { formatDate, jobStatusBadgeClass, jobStatusLabel } from "@/lib/format";

export const metadata: Metadata = { title: "My Jobs" };

export const dynamic = "force-dynamic";

type JobListItem = Job & {
  estimates: Estimate[];
  chosenContractor: Contractor | null;
  payment: Payment | null;
};

export default async function DashboardHomePage() {
  const customer = await getOrCreateCustomer();

  const jobs = await db.job.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: "desc" },
    include: {
      estimates: true,
      chosenContractor: true,
      payment: true,
    },
  });

  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">My Jobs</h1>
          <p className="dash-sub">
            Everything you&apos;ve posted, from pickup to payoff.
          </p>
        </div>
        <Link href="/dashboard/jobs/new" className="btn btn-primary">
          + Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="dash-card">
          <div className="dash-empty">
            <p>You haven&apos;t posted any jobs yet.</p>
            <Link href="/dashboard/jobs/new" className="btn btn-primary">
              Post Your First Job
            </Link>
          </div>
        </div>
      ) : (
        <div className="dash-card" style={{ padding: 0 }}>
          {jobs.map((job: JobListItem) => {
            const pendingEstimates = job.estimates.filter(
              (e: Estimate) => e.status === "PENDING"
            ).length;
            return (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="dash-job-card"
              >
                <div>
                  <div className="dash-job-card-title">{job.title}</div>
                  <div className="dash-job-card-meta">
                    {job.city}, {job.state} &middot; Pickup{" "}
                    {formatDate(job.pickupDate)}
                    {pendingEstimates > 0 && (
                      <>
                        {" "}
                        &middot; {pendingEstimates} new estimate
                        {pendingEstimates === 1 ? "" : "s"}
                      </>
                    )}
                    {job.chosenContractor && (
                      <> &middot; {job.chosenContractor.businessName}</>
                    )}
                  </div>
                </div>
                <span className={jobStatusBadgeClass(job.status)}>
                  {jobStatusLabel(job.status)}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
