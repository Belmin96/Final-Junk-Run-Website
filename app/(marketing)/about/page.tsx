import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Junk Run is a technology marketplace designed to connect customers who need junk removed with independent contractors who provide those services.",
};

export default function AboutPage() {
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
            <span className="label green">About Junk Run</span>
            <h1>
              A simpler way to
              <br />
              <span className="accent">get junk gone.</span>
            </h1>
            <p className="lede">
              Junk Run is a technology marketplace designed to connect customers
              who need junk removed with independent contractors who provide
              those services. Customers can post a job, provide photos and
              pickup details, receive estimates from contractors, and choose who
              they want to work with. Contractors can discover available jobs,
              submit their own estimates, manage accepted jobs, and build their
              contractor profile through completed work.
            </p>
            <div className="cta-row">
              <button type="button" className="btn btn-primary">
                Post Your Job →
              </button>
              <Link href="/haulers" className="btn btn-outline">
                Become a Contractor →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="steps-list">
        <div className="wrap">
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                WHAT IS
                <br />
                JUNK RUN?
              </div>
            </div>
            <div>
              <h3>A marketplace built to connect both sides.</h3>
              <p className="body">
                Junk Run brings customers and independent contractors together
                through one platform.
              </p>
              <div className="flow-chain">
                <span className="flow-step">Customers Post</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Contractors Review</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Contractors Submit Estimates</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Customers Choose</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">The Job Gets Done</span>
              </div>
              <p className="note" style={{ marginTop: "18px" }}>
                Customers describe what they need removed, provide photos and
                pickup information, and post their job. Independent contractors
                review available jobs and decide which opportunities fit their
                business, then each contractor determines their own estimate for
                the work. The customer reviews the available estimates and
                chooses the contractor they want — who then completes the job
                and submits the required completion information through the
                platform.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                BUILT FOR
                <br />
                BOTH SIDES
              </div>
            </div>
            <div>
              <h3>More choice. More control.</h3>
              <p className="body">
                Junk Run is built around giving each side of the marketplace a
                clear, straightforward role.
              </p>
              <div className="role-split">
                <div className="role-card">
                  <span className="label dim">Built For Customers</span>
                  <h3>
                    More choice.
                    <br />A clearer process.
                  </h3>
                  <p className="body" style={{ fontSize: "13.5px" }}>
                    Junk Run gives customers a straightforward way to find
                    independent contractors for their junk-removal needs.
                    Customers can:
                  </p>
                  <ul className="dash-list">
                    <li>Post jobs with photos and details</li>
                    <li>Receive contractor estimates</li>
                    <li>Review contractor information</li>
                    <li>Choose their contractor</li>
                    <li>Follow the job through the platform</li>
                    <li>Review completion information</li>
                    <li>Access their job and payment records</li>
                  </ul>
                  <Link href="/customers" className="btn btn-outline btn-sm">
                    For Customers →
                  </Link>
                </div>
                <div className="role-card">
                  <span className="label dim">
                    Built For Independent Contractors
                  </span>
                  <h3>
                    More opportunities.
                    <br />
                    More control.
                  </h3>
                  <p className="body" style={{ fontSize: "13.5px" }}>
                    Junk Run gives independent contractors access to a
                    marketplace of customer-posted jobs. Contractors can:
                  </p>
                  <ul className="dash-list">
                    <li>Browse available jobs</li>
                    <li>Review job photos and details</li>
                    <li>Decide which jobs interest them</li>
                    <li>Set their own estimates</li>
                    <li>Get selected directly by customers</li>
                    <li>Manage assigned jobs</li>
                    <li>Submit completion evidence</li>
                    <li>Track their earnings</li>
                  </ul>
                  <p className="note">
                    An LLC is not required to participate as an independent
                    contractor. Contractors may operate in their own name, while
                    an LLC can be used if they choose to establish a formal
                    business entity.
                  </p>
                  <Link href="/haulers" className="btn btn-outline btn-sm">
                    For Haulers →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                QUOTE-BASED,
                <br />
                NOT BIDDING
              </div>
            </div>
            <div>
              <h3>The customer chooses. The contractor sets the estimate.</h3>
              <p className="body">
                Junk Run isn't designed around a live bidding war. Contractors
                independently review jobs and determine what they want to
                charge. Customers then review the available estimates and choose
                the contractor they want.
              </p>
              <div className="flow-chain">
                <span className="flow-step">Post</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Estimate</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Choose</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Complete</span>
              </div>
              <p className="sub" style={{ marginTop: "18px" }}>
                Simple, transparent, and easy to understand.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                TECHNOLOGY THAT
                <br />
                CONNECTS THE PROCESS
              </div>
            </div>
            <div>
              <h3>One platform. One job from start to finish.</h3>
              <p className="body">
                Junk Run brings important parts of the junk-removal process
                together in one platform. Depending on the job and workflow, the
                platform can support:
              </p>
              <div className="dash-grid">
                <div className="dash-card">
                  <div className="who">Job Posting</div>
                  <div className="txt">
                    Customers provide photos, descriptions, pickup information,
                    and scheduling details.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Contractor Estimates</div>
                  <div className="txt">
                    Independent contractors submit their own estimates.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Payment Workflow</div>
                  <div className="txt">
                    Payments move through the platform's configured payment
                    process.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Pickup Verification</div>
                  <div className="txt">
                    Scheduled jobs can use GPS-based contractor arrival
                    verification.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Completion Evidence</div>
                  <div className="txt">
                    Contractors submit completion photos and related job
                    information.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Job Tracking</div>
                  <div className="txt">
                    Customers and contractors can follow the status of their
                    jobs.
                  </div>
                </div>
                <div className="dash-card">
                  <div className="who">Reviews & Profiles</div>
                  <div className="txt">
                    Contractor profiles and customer feedback can help provide
                    additional information when customers make their choice.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                WHY WE BUILT
                <br />
                JUNK RUN
              </div>
            </div>
            <div>
              <h3>To make the process easier to understand.</h3>
              <p className="body">
                Junk removal can involve multiple phone calls, unclear pricing,
                scheduling back-and-forth, and uncertainty about who will
                actually handle the job. Junk Run was designed to bring those
                steps into one marketplace. Instead of starting from scratch
                every time:
              </p>
              <div className="big-list">
                <div className="line">Post the job.</div>
                <div className="line">Receive estimates.</div>
                <div className="line">Choose your contractor.</div>
                <div className="line">Follow the job.</div>
                <div className="line">Get it gone.</div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                OUR
                <br />
                APPROACH
              </div>
            </div>
            <div>
              <h3>Simple for customers. Flexible for contractors.</h3>
              <p className="body">
                Junk Run is built around giving each side a clear role.
              </p>
              <div className="trio-grid">
                <div className="info-card">
                  <div className="who">Customers</div>
                  <div className="txt">
                    Post the job and choose the contractor.
                  </div>
                </div>
                <div className="info-card">
                  <div className="who">Contractors</div>
                  <div className="txt">
                    Review opportunities and decide which jobs fit their
                    business.
                  </div>
                </div>
                <div className="info-card">
                  <div className="who">Junk Run</div>
                  <div className="txt">
                    Provides the technology and marketplace that connects the
                    two sides.
                  </div>
                </div>
              </div>
              <p className="note" style={{ marginTop: "18px" }}>
                <b style={{ color: "var(--white)" }}>
                  Junk Run does not perform hauling services.
                </b>{" "}
                The hauling work is performed by independent contractors.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                OUR
                <br />
                MISSION
              </div>
            </div>
            <div>
              <h3>Make junk removal simple.</h3>
              <p className="body">
                Junk Run is being built to create a straightforward connection
                between people who need things removed and independent
                contractors who provide those services. The goal is simple:
              </p>
              <div className="big-list">
                <div className="line">Make it easier to post.</div>
                <div className="line">Make it easier to quote.</div>
                <div className="line">Make it easier to choose.</div>
                <div className="line">Make it easier to get it gone.</div>
              </div>
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
          <span className="label green">Ready To Use Junk Run?</span>
          <h2 style={{ marginTop: "12px" }}>
            Get it gone with independent contractors you choose.
          </h2>
          <p className="lede">
            Whether you're getting rid of unwanted furniture, cleaning out a
            garage, moving, renovating, or looking for your next junk-removal
            opportunity, Junk Run brings customers and independent contractors
            together through one marketplace.
          </p>
          <div className="dual">
            <div className="col">
              <button type="button" className="btn btn-primary">
                Post Your Job →
              </button>
            </div>
            <div className="col">
              <Link href="/haulers" className="btn btn-outline">
                Become a Contractor →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
