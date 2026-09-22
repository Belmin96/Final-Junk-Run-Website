import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Customer Agreement, Contractor Agreement, Prohibited Items policy, and Refund & Cancellation Policy for the Junk Run marketplace.",
};

export default function TermsPage() {
  return (
    <>
      <section className="intro">
        <div className="smoke">
          <span
            className="s1"
            style={{
              width: "380px",
              height: "380px",
              left: "-120px",
              top: "-80px",
            }}
          />
          <span
            className="s2"
            style={{
              width: "320px",
              height: "320px",
              right: "-100px",
              top: "40px",
            }}
          />
        </div>
        <div className="wrap">
          <div className="intro-content">
            <span className="label green">Legal</span>
            <h1>
              Terms & <span className="accent">Conditions</span>
            </h1>
            <p className="lede">
              This page covers the Customer Agreement, Contractor Agreement,
              Prohibited Items policy, and Refund & Cancellation Policy for
              using the Junk Run marketplace.
            </p>
            <p className="updated">
              Junk Run is a technology marketplace operated by BSJ Innovation
              LLC. Junk Run does not perform hauling services. Contractors are
              independent service providers.
            </p>
          </div>
          <div className="toc">
            <span className="label dim">Jump to a section</span>
            <div className="toc-links">
              <a href="#customer-agreement">Customer Agreement</a>
              <a href="#contractor-agreement">Contractor Agreement</a>
              <a href="#prohibited-items">Prohibited Items</a>
              <a href="#refund-policy">Refund & Cancellation Policy</a>
            </div>
          </div>
        </div>
      </section>
      <section className="legal-section" id="customer-agreement">
        <div className="wrap">
          <span className="label green section-label">For Customers</span>
          <h2>Customer Agreement</h2>
          <p className="intro-p">
            By posting a job on Junk Run, you agree to the following terms
            covering payment, pickup verification, and dispute handling.
          </p>
          <div className="legal-block">
            <h3>Payment & Authorization</h3>
            <p>
              A verified payment method must be attached to your account before
              you can post a job. You are not charged simply for posting a job.
              Once you accept a contractor's estimate, Junk Run authorizes and
              holds the applicable payment while the job moves through the
              completion process — the contractor is not paid immediately.
            </p>
            <div className="flow-chain">
              <span className="flow-step">Estimate Accepted</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Payment Authorized</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Pickup</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Job Completed</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Completion/Dispute Period</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Contractor Paid</span>
            </div>
          </div>
          <div className="legal-block">
            <h3>GPS Pickup Verification</h3>
            <p>
              For scheduled pickups, the contractor confirms arrival through the
              app rather than a simple manual check-in. Junk Run verifies the
              contractor's submitted location against your pickup address,
              including whether they're within the required pickup window and
              within the arrival geofence.
            </p>
            <div className="stat-inline">
              <span className="num">250m</span>
              <span className="lbl">Arrival Geofence</span>
            </div>
            <p>A verified arrival becomes part of the permanent job record.</p>
          </div>
          <div className="legal-block">
            <h3>The Pickup Window</h3>
            <p>
              For jobs with a specific scheduled time, the contractor has a{" "}
              <b style={{ color: "var(--white)" }}>45-minute window</b> to
              arrive and complete the pickup.
            </p>
            <ul>
              <li>
                At 30 minutes, the contractor receives a warning that 15 minutes
                remain.
              </li>
              <li>
                If the pickup isn't completed within 45 minutes, the job is
                treated as a missed pickup: your payment authorization is
                cancelled when possible, the job is returned to the marketplace
                for a new contractor, the original contractor is excluded from
                that repost, and you're notified.
              </li>
            </ul>
            <p>
              If you chose "Anytime That Day" instead of a specific time, that
              job uses a separate all-day window with its own deadline and
              advance warning.
            </p>
          </div>
          <div className="legal-block">
            <h3>Completion & Before/After Photos</h3>
            <p>
              When the contractor finishes, they submit an after photo through
              the app, referenced against your original before photo, along with
              capture time and GPS information. You can review both photos once
              the job is marked complete.
            </p>
          </div>
          <div className="legal-block">
            <h3>Dispute Process</h3>
            <p>
              If you believe there's a problem with a completed job, you can
              submit a dispute during the applicable dispute window. Payment is
              not finalized immediately when a dispute is submitted — the job
              enters a disputed status for administrative review, and you'll
              receive confirmation that it's under review.
            </p>
          </div>
        </div>
      </section>
      <section className="legal-section" id="contractor-agreement">
        <div className="wrap">
          <span className="label green section-label">For Contractors</span>
          <h2>Contractor Agreement</h2>
          <p className="intro-p">
            By accepting jobs through Junk Run, independent contractors agree to
            the following terms covering estimates, pickup, earnings, and
            accountability.
          </p>
          <div className="legal-block">
            <h3>Estimates & Selection</h3>
            <p>
              Junk Run is quote-based, not a live bidding system. You
              independently review each job and submit your own price,
              availability, and message. Once a customer accepts your estimate,
              the job is assigned to you and removed from the open marketplace.
            </p>
          </div>
          <div className="legal-block">
            <h3>Pickup & GPS Verification</h3>
            <p>
              For scheduled pickups: Navigate → submit "I'm Here" → arrival is
              checked against the pickup location and geofence → start the job.
              Your verified arrival becomes part of the job record.
            </p>
          </div>
          <div className="legal-block">
            <h3>The 45-Minute Pickup Window</h3>
            <p>Your pickup window begins at the scheduled time.</p>
            <ul>
              <li>
                At 30 minutes (15 minutes remaining), you'll receive a warning.
              </li>
              <li>
                At 45 minutes, if the pickup hasn't been completed, the job can
                be returned to the marketplace, the missed pickup is recorded,
                and you can be excluded from the reposted job.
              </li>
            </ul>
            <p>
              Only accept jobs you can realistically complete within the
              required window. "Anytime That Day" jobs use a different all-day
              window — check each job's specific terms.
            </p>
          </div>
          <div className="legal-block">
            <h3>Completion Evidence & Payout</h3>
            <p>
              Submit an after photo, capture time, and GPS information through
              the app when the job is finished. Your payout is released once the
              job successfully passes the completion and applicable dispute
              review period. Your dashboard tracks total, weekly, monthly, and
              yearly earnings, completed and cancelled jobs, refunds, processing
              fees, and net earnings.
            </p>
          </div>
          <div className="legal-block">
            <h3>Contractor Accountability</h3>
            <p>
              Customers depend on contractors showing up for jobs they've
              accepted. Repeated missed pickups carry the following
              consequences:
            </p>
            <div className="ladder">
              <div className="rung">
                <div className="lvl">1st Missed Pickup</div>
                <h4>Written warning</h4>
              </div>
              <div className="rung">
                <div className="lvl">2nd Missed Pickup</div>
                <h4>48-hour suspension</h4>
              </div>
              <div className="rung">
                <div className="lvl">3rd Missed Pickup</div>
                <h4>7-day suspension</h4>
              </div>
              <div className="rung">
                <div className="lvl">4th Missed Pickup</div>
                <h4>Account deactivation</h4>
              </div>
            </div>
          </div>
          <div className="legal-block">
            <h3>No LLC Required</h3>
            <p>
              You do not need an LLC to join Junk Run — you can participate as
              an independent contractor in your own name. An LLC is optional.
            </p>
            <div className="qa-grid">
              <div className="qa-card">
                <div className="q">LLC Required?</div>
                <div className="a">No.</div>
              </div>
              <div className="qa-card">
                <div className="q">LLC Preferred?</div>
                <div className="a">It can be.</div>
              </div>
            </div>
            <p style={{ marginTop: "20px" }}>
              As an independent contractor, you're responsible for your own
              business operations, vehicle and equipment, licenses and permits,
              insurance, taxes, and legal/regulatory compliance, including the
              safe handling and transportation of materials.
            </p>
          </div>
        </div>
      </section>
      <section className="legal-section" id="prohibited-items">
        <div className="wrap">
          <span className="label green section-label">Safety</span>
          <h2>Prohibited Items Policy</h2>
          <p className="intro-p">
            Junk Run does not allow hazardous or otherwise prohibited materials
            to be posted for removal through the marketplace.
          </p>
          <div className="legal-block">
            <p>
              Customers should only post items that can legally and safely be
              handled by the contractor they select. Contractors should review a
              job's description and photos before submitting an estimate and
              confirm they are legally and safely equipped to perform the work —
              if a job includes a prohibited or hazardous item, don't accept it.
            </p>
            <div className="callout">
              <h4>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M12 3l9 16H3z" />
                  <path d="M12 10v4M12 17h.01" />
                </svg>
                NOT SURE IF SOMETHING QUALIFIES?
              </h4>
              <p>
                If a material requires special handling or licensed disposal,
                use a service that's equipped for that specific material instead
                of posting it through Junk Run.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="legal-section" id="refund-policy">
        <div className="wrap">
          <span className="label green section-label">Payments</span>
          <h2>Refund & Cancellation Policy</h2>
          <p className="intro-p">
            How cancellations, refunds, and missed pickups are handled for both
            customers and contractors.
          </p>
          <div className="legal-block">
            <h3>Customer Cancellations</h3>
            <ul>
              <li>
                Cancelling before the scheduled pickup time begins: no
                cancellation fee.
              </li>
              <li>
                Cancelling after the scheduled pickup time begins: a 5%
                cancellation fee applies.
              </li>
            </ul>
          </div>
          <div className="legal-block">
            <h3>Contractor Cancellations</h3>
            <p>
              If a selected contractor cancels, the job automatically returns to
              the open marketplace and you can select another available
              estimate.
            </p>
          </div>
          <div className="legal-block">
            <h3>Missed Pickups</h3>
            <p>
              If the required pickup process isn't completed within the
              45-minute window (or the applicable "Anytime That Day" window),
              the job is treated as a missed pickup: your payment is refunded
              according to the missed-pickup process, and the job is reposted to
              the marketplace. The contractor who missed the pickup is excluded
              from that repost.
            </p>
          </div>
        </div>
      </section>
      <section
        className="legal-section"
        style={{ textAlign: "center", paddingBottom: "70px" }}
      >
        <div className="wrap">
          <p style={{ maxWidth: "56ch", margin: "0 auto", fontSize: "14px" }}>
            Questions about any of these policies? Check the{" "}
            <Link
              href="/faq"
              style={{
                color: "var(--green)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              FAQ
            </Link>{" "}
            or reach out through your Junk Run account.
          </p>
        </div>
      </section>
    </>
  );
}
