import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Junk Run connects customers with independent contractors through a simple, quote-based marketplace. Post your job, choose your contractor, and track it through to done.",
};

export default function HowItWorksPage() {
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
            <span className="label green">How It Works</span>
            <h1>
              From <span className="hero-metal">"I need this gone"</span>
              <br />
              to <span className="accent">"It's gone."</span>
            </h1>
            <p className="lede">
              Junk Run connects customers with independent contractors through a
              simple, quote-based marketplace. Post your job, choose your
              contractor, and track it through to done.
            </p>
            <div className="cta-row">
              <button type="button" className="btn btn-primary">
                Post a Job →
              </button>
              <button type="button" className="btn btn-outline">
                Become a Contractor →
              </button>
            </div>
          </div>
        </div>
        <div className="quote-divider">
          <div className="wrap">
            <div className="inner">
              <span className="dash" />
              <p className="quote">
                JUNK RUN IS QUOTE-BASED — NOT A BIDDING SYSTEM.
              </p>
              <span className="dash" />
            </div>
            <p className="sub">
              Contractors independently review jobs and submit their own
              estimates. There is no live auction or bidding war.
            </p>
          </div>
        </div>
      </section>
      <section className="steps-list">
        <div className="wrap">
          <div className="step-block">
            <div>
              <span className="step-num">STEP</span>
              <div className="step-num-big">01</div>
            </div>
            <div>
              <h3>Post Your Job</h3>
              <p className="sub">
                Tell contractors exactly what needs to be removed.
              </p>
              <p className="body">
                Add a before photo, your pickup address, and a date — or choose{" "}
                <b style={{ color: "var(--white)" }}>Anytime That Day</b>. A
                verified payment method just needs to be on file; you're not
                charged for posting.
              </p>
              <div className="single-photo">
                <div className="img-slot">
                  <img
                    src="/images/curbside-pile-of-junk-items-ready-for-pi.jpg"
                    alt="Curbside pile of junk items ready for pickup, including a mattress, furniture, boxes and bagged items"
                    width="1536"
                    height="1024"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">STEP</span>
              <div className="step-num-big">02</div>
            </div>
            <div>
              <h3>Receive Estimates</h3>
              <p className="sub">
                You're choosing between estimates — not participating in a live
                bidding war.
              </p>
              <p className="body">
                Independent contractors review your job on the HaulBoard and
                send their own price, availability, and a short message. For
                example:
              </p>
              <div className="estimate-row">
                <div className="estimate-card">
                  <div className="who">Contractor A</div>
                  <div className="price">$175</div>
                  <div className="note">Available 2–4 PM</div>
                </div>
                <div className="estimate-card">
                  <div className="who">Contractor B</div>
                  <div className="price">$225</div>
                  <div className="note">Large-load capable</div>
                </div>
                <div className="estimate-card">
                  <div className="who">Contractor C</div>
                  <div className="price">$190</div>
                  <div className="note">Available Saturday morning</div>
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">STEP</span>
              <div className="step-num-big">03</div>
            </div>
            <div>
              <h3>Choose & Pay Securely</h3>
              <p className="body">
                Compare contractor ratings, completed jobs, and estimates, then
                choose who you want. Once you accept, your payment is authorized
                and held securely — the contractor isn't paid until the job is
                verified complete.
              </p>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">STEP</span>
              <div className="step-num-big">04</div>
            </div>
            <div>
              <h3>GPS-Verified Pickup</h3>
              <p className="sub">A verified pickup — not just "I'm here."</p>
              <p className="body">
                Your contractor confirms arrival through the app, and Junk Run
                checks their location against your pickup address before the job
                can start.
              </p>
              <div className="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                ARRIVAL VERIFIED
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">STEP</span>
              <div className="step-num-big">05</div>
            </div>
            <div>
              <h3>Job Complete & Protected</h3>
              <p className="body">
                Your contractor submits an after photo, referenced against your
                original before photo, as proof of completion. If something
                isn't right, you have a short window to flag it before payment
                is released.
              </p>
              <div className="twin-photo">
                <figure>
                  <div className="img-slot">
                    <img
                      src="/images/curbside-pile-of-junk-items-ready-for-pi.jpg"
                      alt="Curbside pile of junk items ready for pickup, before removal"
                      width="1536"
                      height="1024"
                    />
                  </div>
                  <figcaption>Before</figcaption>
                </figure>
                <figure>
                  <div className="img-slot">
                    <img
                      src="/images/clean-driveway-and-front-entrance-after.jpg"
                      alt="Clean driveway and front entrance after junk removal"
                      width="1536"
                      height="1024"
                    />
                  </div>
                  <figcaption>After</figcaption>
                </figure>
              </div>
              <p className="note" style={{ marginTop: "20px" }}>
                Full details on payment timing, the pickup window, and the
                dispute process are in our{" "}
                <Link
                  href="/terms"
                  style={{
                    color: "var(--green)",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Terms & Conditions →
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
          <span className="label green">Get It Gone With Junk Run</span>
          <h2 style={{ marginTop: "12px" }}>
            Post it. Get quotes. Choose your contractor. Get it gone.
          </h2>
          <p className="lede">
            Whether you're cleaning out a garage, getting rid of furniture,
            moving, renovating, or simply reclaiming your space, Junk Run
            connects you with independent contractors who can provide estimates
            for your job.
          </p>
          <div className="dual">
            <div className="col">
              <span className="label dim">For Customers</span>
              <button type="button" className="btn btn-primary">
                Post Your Job →
              </button>
            </div>
            <div className="col">
              <span className="label dim">For Contractors</span>
              <button type="button" className="btn btn-outline">
                Join the Marketplace →
              </button>
            </div>
          </div>
          <p className="footnote">
            Junk Run connects customers with independent contractors. Junk Run
            does not perform hauling services — contractors are independent
            service providers.
          </p>
        </div>
      </section>
    </>
  );
}
