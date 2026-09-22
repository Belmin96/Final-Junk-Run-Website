import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Haulers",
  description:
    "Turn your availability into real junk-removal opportunities. Browse jobs, set your own estimate, get selected, and get paid — all as an independent contractor.",
};

export default function HaulersPage() {
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
            <span className="label green">For Haulers</span>
            <h1>
              More Jobs.
              <br />
              <span className="accent">More Opportunity.</span>
            </h1>
            <p className="lede">
              Turn your availability into real junk-removal opportunities.
              Browse jobs, set your own estimate, get selected, and get paid —
              all as an independent contractor.
            </p>
            <div className="cta-row">
              <button type="button" className="btn btn-primary">
                Join as a Contractor →
              </button>
              <Link href="/how-it-works" className="btn btn-outline">
                See How It Works →
              </Link>
            </div>
            <div className="trust-row">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                No LLC required
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                Set your own estimates
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                Independent contractor
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                Secure payment workflow
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="steps-list">
        <div className="wrap">
          <div className="step-block">
            <div>
              <span className="step-num">01</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                FIND JOBS THAT
                <br />
                FIT YOUR BUSINESS
              </div>
            </div>
            <div>
              <h3>Your next job could be waiting.</h3>
              <p className="body">
                Browse available jobs on the Junk Run{" "}
                <b style={{ color: "var(--white)" }}>HaulBoard</b> — photos,
                location, and pickup window included — and decide which
                opportunities are worth pursuing.
              </p>
              <p className="sub">Review it. Price it. Decide.</p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">02</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                SET YOUR OWN
                <br />
                ESTIMATE — NOT A<br />
                BIDDING WAR
              </div>
            </div>
            <div>
              <h3>You set the price. The customer decides.</h3>
              <p className="body">
                Junk Run is quote-based, not a live auction. You independently
                review the job and submit your own price, availability, and
                message — no undercutting another contractor in real time.
              </p>
              <p className="sub">Your business. Your estimate.</p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">03</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                GET SELECTED
                <br />& PICK UP
              </div>
            </div>
            <div>
              <h3>Show up. Verify arrival. Get it done.</h3>
              <p className="body">
                When a customer accepts your estimate, the job is assigned to
                you. Confirm arrival through the app — Junk Run checks your
                location against the pickup address — then complete the work
                within your pickup window.
              </p>
              <p className="note">
                Pickup windows, GPS verification, and the missed-pickup policy
                are covered in our{" "}
                <Link
                  href="/terms#contractor-agreement"
                  style={{
                    color: "var(--green)",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Contractor Agreement →
                </Link>
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">04</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                COMPLETE THE JOB
                <br />& GET PAID
              </div>
            </div>
            <div>
              <h3>Show the difference. Get paid through the marketplace.</h3>
              <p className="body">
                Submit an after photo as proof of completion, and your payout is
                released once the job clears its review period. Track your
                earnings, completed jobs, and payout history from your
                contractor dashboard.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">05</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                BUILD YOUR
                <br />
                REPUTATION
              </div>
            </div>
            <div>
              <h3>Every job can help build your business.</h3>
              <p className="body">
                Completed jobs, ratings, and your verification status all show
                on your contractor profile — helping customers choose you with
                confidence next time.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">06</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                YOU DON'T
                <br />
                NEED AN LLC
              </div>
            </div>
            <div>
              <h3>Start as an independent contractor.</h3>
              <p className="body">
                You can join Junk Run in your own name — no LLC required. An LLC
                is optional if you'd prefer to operate through a formal business
                entity.
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
              <p className="note" style={{ marginTop: "18px" }}>
                As an independent contractor, you're responsible for your own
                business, equipment, licenses, insurance, and taxes. Full
                details — including safety requirements and prohibited items —
                are in our{" "}
                <Link
                  href="/terms#contractor-agreement"
                  style={{
                    color: "var(--green)",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Contractor Agreement →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="close-cta">
        <div className="smoke">
          <span
            className="s1"
            style={{
              width: "420px",
              height: "420px",
              left: "25%",
              top: "-160px",
            }}
          />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: "2" }}>
          <span className="label green">Ready For Your Next Job?</span>
          <h2 style={{ marginTop: "12px" }}>More jobs. More opportunity.</h2>
          <p className="lede">
            Join Junk Run as an independent contractor and choose the
            marketplace opportunities that fit your business.
          </p>
          <div className="dual">
            <div className="col">
              <button type="button" className="btn btn-primary">
                Join as a Contractor →
              </button>
            </div>
            <div className="col">
              <button type="button" className="btn btn-outline">
                View Available Jobs →
              </button>
            </div>
          </div>
          <p className="footnote">
            Junk Run is a marketplace. Junk Run does not perform hauling
            services. Contractors are independent service providers.
          </p>
        </div>
      </section>
    </>
  );
}
