import type { Metadata } from "next";
import NewJobForm from "@/components/dashboard/NewJobForm";

export const metadata: Metadata = { title: "Post a Job" };

export default function NewJobPage() {
  return (
    <>
      <div className="dash-header-row">
        <div>
          <h1 className="dash-h1">Post a Job</h1>
          <p className="dash-sub">
            Tell contractors what needs to go and where to pick it up.
          </p>
        </div>
      </div>

      <div className="dash-card">
        <NewJobForm />
      </div>
    </>
  );
}
