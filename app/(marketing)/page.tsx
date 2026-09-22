import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img
            src="/images/junk-run-pickup-truck-and-trailer-loaded.jpg"
            alt="Junk Run pickup truck and trailer loaded with furniture at a residential property"
            width="2170"
            height="725"
          />
        </div>
        <div className="hero-overlay" />
        <div className="smoke">
          <span
            className="s1"
            style={{
              width: "420px",
              height: "420px",
              left: "-120px",
              top: "-100px",
            }}
          />
          <span
            className="s2"
            style={{
              width: "340px",
              height: "340px",
              left: "10%",
              bottom: "-160px",
            }}
          />
          <span
            className="s3"
            style={{ width: "300px", height: "300px", left: "36%", top: "20%" }}
          />
        </div>
        <div className="wrap hero-content">
          <span className="label green">Same Day. Real Help. Real People.</span>
          <h1>
            <span className="hero-metal">GET IT GONE</span>
            <br />
            <span className="accent">WITH JUNK RUN.</span>
          </h1>
          <p className="lede">
            Post your junk removal job, receive quotes from local haulers,
            choose your hauler, and enjoy a cleaner space — all in one simple
            platform.
          </p>
          <div className="hero-ctas">
            <button type="button" className="btn btn-primary">
              Get Started →
            </button>
          </div>
          <div className="trust-row">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
              </svg>
              Secure Payments
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <circle cx="18" cy="9" r="2.6" />
                <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.8" />
              </svg>
              Verified Haulers
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M20 5c-8 0-14 6-14 14 8 0 14-6 14-14z" />
                <path d="M6 19c0-4 2-7 5-9" />
              </svg>
              Cleaner Communities
            </div>
          </div>
        </div>
        <div className="hero-caption script">
          More Space
          <br />A Brighter Tomorrow
        </div>
      </section>
      <section className="steps-section" id="how">
        <div className="smoke">
          <span
            className="s2"
            style={{
              width: "300px",
              height: "300px",
              left: "-80px",
              top: "-140px",
            }}
          />
          <span
            className="s3"
            style={{
              width: "260px",
              height: "260px",
              right: "-60px",
              bottom: "-140px",
            }}
          />
        </div>
        <div className="wrap steps-row">
          <div className="step">
            <div className="step-top">
              <span className="num-badge">1</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 3v2h6V3" />
                <path d="M8 11h8M8 15h5" />
              </svg>
            </div>
            <h3>Submit Your Job</h3>
            <p>Tell us what you need removed with photos and details.</p>
          </div>
          <span className="chevron">›</span>
          <div className="step">
            <div className="step-top">
              <span className="num-badge">2</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M6 3h9l3 3v15H6z" />
                <path d="M9 11h6M9 15h6" />
              </svg>
            </div>
            <h3>Receive Quotes</h3>
            <p>Get quotes from verified local haulers.</p>
          </div>
          <span className="chevron">›</span>
          <div className="step">
            <div className="step-top">
              <span className="num-badge">3</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="3.3" />
                <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
              </svg>
            </div>
            <h3>Choose Your Hauler</h3>
            <p>Review profiles and select the best fit for your job.</p>
          </div>
          <span className="chevron">›</span>
          <div className="step">
            <div className="step-top">
              <span className="num-badge">4</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <h3>Secure Payment</h3>
            <p>Your payment is held safely until the job is completed.</p>
          </div>
          <span className="chevron">›</span>
          <div className="step">
            <div className="step-top">
              <span className="num-badge">5</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.5 2.5L16 9" />
              </svg>
            </div>
            <h3>Verified Completion</h3>
            <p>Confirm the job is done and enjoy your clean space!</p>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="smoke">
          <span
            className="s2"
            style={{
              width: "320px",
              height: "320px",
              left: "-100px",
              top: "10%",
            }}
          />
          <span
            className="s3"
            style={{
              width: "280px",
              height: "280px",
              right: "-90px",
              bottom: "5%",
            }}
          />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: "2" }}>
          <div className="panel" id="customers">
            <div className="panel-text">
              <span className="label dim">For Customers</span>
              <h3>
                A <span className="hl">Cleaner Space</span>
                <br />
                Is Just a Few Clicks Away
              </h3>
              <ul className="check-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Simple and fast job posting
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Quotes from independent haulers
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Secure, worry-free payments
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Verified completion before payment is released
                </li>
              </ul>
              <div className="cta-row">
                <button type="button" className="btn btn-primary">
                  Get Started →
                </button>
                <div className="mini-trust">
                  <div className="mini-item">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M3 11l9-7 9 7" />
                      <path d="M5 10v10h14V10" />
                    </svg>
                    <span>Cleaner Homes</span>
                  </div>
                  <div className="mini-item">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M20 5c-8 0-14 6-14 14 8 0 14-6 14-14z" />
                      <path d="M6 19c0-4 2-7 5-9" />
                    </svg>
                    <span>Greener Communities</span>
                  </div>
                  <div className="mini-item">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <circle cx="9" cy="8" r="3.2" />
                      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                      <circle cx="18" cy="9" r="2.6" />
                      <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.8" />
                    </svg>
                    <span>Happier Neighbors</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-photo">
              <div className="img-slot">
                <img
                  src="/images/organized-garage-ready-for-junk-removal.jpg"
                  alt="Organized garage ready for junk removal"
                  width="1374"
                  height="1145"
                />
              </div>
              <div className="panel-caption script">
                Cleaner Homes.
                <br />
                Happier Communities.
              </div>
            </div>
          </div>
          <div className="panel" id="haulers">
            <div className="panel-text">
              <span className="label dim">For Haulers</span>
              <h3>
                <span className="hl">More Jobs.</span>
                <br />
                More Opportunity.
              </h3>
              <ul className="check-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Receive real job opportunities
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Set your own availability
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Submit your own quotes
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Get paid securely
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Build your reputation
                </li>
              </ul>
              <div className="cta-row">
                <Link href="/haulers" className="btn btn-primary">
                  Become a Junk Run Hauler →
                </Link>
              </div>
            </div>
            <div className="panel-photo">
              <div className="img-slot">
                <img
                  src="/images/hauler-loading-a-sofa-into-a-trailer.jpg"
                  alt="Hauler loading a sofa into a trailer"
                  width="1374"
                  height="1145"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
