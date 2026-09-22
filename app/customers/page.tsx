import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Customers",
  description:
    "Post what you need removed, get real estimates from independent contractors, choose who you want, and pay only once the job is done.",
};

export default function CustomersPage() {
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
            <span className="label green">For Customers</span>
            <h1>
              Get rid of the junk.
              <br />
              <span className="accent">Keep your peace of mind.</span>
            </h1>
            <p className="lede">
              Post what you need removed, get real estimates from independent
              contractors, choose who you want, and pay only once the job is
              done.
            </p>
            <div className="cta-row">
              <button type="button" className="btn btn-primary">
                Post Your Job →
              </button>
              <Link href="/how-it-works" className="btn btn-outline">
                See How It Works →
              </Link>
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
                Contractor Profiles
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M12 21s7-6.6 7-11.5S15.87 3 12 3 5 5.6 5 9.5 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.3" />
                </svg>
                GPS Pickup Verification
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <rect x="3" y="5" width="8" height="8" rx="1.5" />
                  <rect x="13" y="11" width="8" height="8" rx="1.5" />
                  <path d="M11 9l2 2" />
                </svg>
                Before & After Photos
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
                POST
                <br />
                YOUR JOB
              </div>
            </div>
            <div>
              <h3>
                Your job. Your details.
                <br />
                Your way.
              </h3>
              <p className="body">
                Describe what needs to be removed, add a photo, and set your
                pickup date — or choose{" "}
                <b style={{ color: "var(--white)" }}>Anytime That Day</b>.
                That's it.
              </p>
              <div className="single-photo">
                <div className="img-slot">
                  <img
                    src="/images/phone-screen-showing-the-junk-run-app-s.jpg"
                    alt="Phone screen showing the Junk Run app's Post Your Job form with photos of items to remove"
                    style={{ objectPosition: "top" }}
                    width="1586"
                    height="992"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">02</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                COMPARE
                <br />
                REAL QUOTES
              </div>
            </div>
            <div>
              <h3>You choose. Not a bidding war.</h3>
              <p className="body">
                Independent contractors review your job and send their own
                price, availability, and a message. No live auction — you
                compare and pick who you want.
              </p>
              <div className="single-photo">
                <div className="img-slot">
                  <img
                    src="/images/comparing-three-contractor-estimates-sid.jpg"
                    alt="Comparing three contractor estimates side by side, then viewing a contractor's full profile with verification badges"
                    width="1563"
                    height="1006"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">03</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                PAY ONLY WHEN
                <br />
                IT'S DONE
              </div>
            </div>
            <div>
              <h3>No cash. No surprises.</h3>
              <p className="body">
                Your payment is held securely and only released once the job is
                verified complete — GPS-confirmed arrival, before & after
                photos, and a short window to flag anything that isn't right.
              </p>
              <div className="trust-row" style={{ marginTop: "24px" }}>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  GPS-verified pickup
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Before & after photos
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Dispute protection
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">04</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                KNOW WHEN YOUR
                <br />
                CONTRACTOR ARRIVES
              </div>
            </div>
            <div>
              <h3>GPS-verified pickup</h3>
              <p className="body">
                For scheduled pickups, Junk Run doesn't rely solely on someone
                pressing "I'm here." The contractor can use GPS arrival
                verification through the app. Junk Run checks their location
                against the pickup location.
              </p>
              <div className="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
                ARRIVAL VERIFIED
              </div>
              <p className="note">
                This creates an additional record showing that the contractor
                reached the pickup location.
              </p>
              <div className="phone-mock-wrap">
                <div className="phone-mock">
                  <div className="phone-screen">
                    <div className="img-slot">
                      <img
                        src="/images/phone-screen-showing-the-contractor-s-li.jpg"
                        alt="Phone screen showing the contractor's live GPS location arriving at the pickup address, with an Arrival Verified notification"
                        width="419"
                        height="738"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="step-block">
            <div>
              <span className="step-num">05</span>
              <div
                className="step-num-big"
                style={{ fontSize: "22px", letterSpacing: "0.02em" }}
              >
                GET IT
                <br />
                GONE
              </div>
            </div>
            <div>
              <h3>Enjoy the space you got back.</h3>
              <p className="body">
                Once the job's complete, view your receipt, leave a review, and
                you're done. Everything's saved to your Junk Run account if you
                ever need it again.
              </p>
              <p className="note">
                Full details on payments, GPS verification, and the pickup
                window are in our{" "}
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
          <span className="label green">Ready To Get It Gone?</span>
          <h2 style={{ marginTop: "12px" }}>
            Post your junk removal job and start receiving contractor estimates.
          </h2>
          <div
            className="cta-row"
            style={{ justifyContent: "center", marginTop: "30px" }}
          >
            <button type="button" className="btn btn-primary">
              Post Your Job →
            </button>
          </div>
          <p className="footnote">
            No live bidding. No complicated process.
            <br />
            Just post, choose, and get it gone.
          </p>
        </div>
      </section>
    </>
  );
}
