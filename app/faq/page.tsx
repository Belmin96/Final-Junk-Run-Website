"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function FaqPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      const catBtn = target.closest(".faq-cat-btn") as HTMLElement | null;
      if (catBtn) {
        const wrap = catBtn.closest(".faq-cat");
        if (wrap) {
          const isOpen = wrap.classList.toggle("open");
          catBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
        return;
      }

      const qBtn = target.closest(".faq-q-btn") as HTMLElement | null;
      if (qBtn) {
        const wrap = qBtn.closest(".faq-q");
        if (wrap) {
          const isOpen = wrap.classList.toggle("open");
          qBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
      }
    }

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={rootRef}>
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
            <span className="label green">Junk Run FAQ</span>
            <h1>
              Everything you need
              <br />
              to know{" "}
              <span className="accent">
                before you post,
                <br />
                quote, or get it gone.
              </span>
            </h1>
            <p className="lede">
              Answers about posting jobs, contractor estimates, payments, pickup
              verification, cancellations, reviews, and how the Junk Run
              marketplace works.
            </p>
            <div className="cta-row">
              <button type="button" className="btn btn-primary">
                Post a Job →
              </button>
              <Link href="/haulers" className="btn btn-outline">
                Become a Contractor →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "20px 0 90px", position: "relative" }}>
        <div className="wrap">
          <div className="faq-list">
            <div className="faq-cat" id="faq-cat-wrap-1">
              <button
                className="faq-cat-btn"
                id="faq-cat-1-header"
                aria-expanded="false"
                aria-controls="faq-cat-1"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>General</h3>
                    <p>
                      How Junk Run works, who performs the work, availability,
                      and the quote-based marketplace.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">6 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-1"
                role="region"
                aria-labelledby="faq-cat-1-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-1"
                      >
                        <span>What is Junk Run?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run is a technology marketplace that connects
                              customers who need junk removed with independent
                              contractors who provide junk-removal services.
                            </p>
                            <p>
                              Customers can post jobs, receive contractor
                              estimates, choose a contractor, and manage the job
                              through the platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-2"
                      >
                        <span>Is Junk Run a junk-removal company?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              No. Junk Run is not a junk-removal or hauling
                              company.
                            </p>
                            <p>
                              Junk Run provides the technology and marketplace
                              that connects customers with independent
                              contractors. The actual hauling services are
                              performed by independent contractors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-3"
                      >
                        <span>How does Junk Run work?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers post a job with photos, descriptions,
                              pickup information, and other required details.
                              Independent contractors review available jobs and
                              submit their own estimates.
                            </p>
                            <p>
                              The customer reviews the estimates and chooses the
                              contractor they want. The selected contractor
                              completes the job and submits completion
                              information through Junk Run.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-4"
                      >
                        <span>Is Junk Run available in my area?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run is designed for nationwide availability
                              across the United States.
                            </p>
                            <p>
                              Availability of individual services can depend on
                              the contractors operating in a customer's area and
                              applicable local requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-5"
                      >
                        <span>Is Junk Run a bidding platform?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              No. Junk Run is a quote-based marketplace, not a
                              live bidding system.
                            </p>
                            <p>
                              Contractors independently review jobs and submit
                              their own estimates. Customers then review the
                              available estimates and choose the contractor they
                              want.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-1-6"
                      >
                        <span>Who performs the hauling?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-1-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              The hauling is performed by the independent
                              contractor selected by the customer.
                            </p>
                            <p>Junk Run itself does not perform the hauling.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-2">
              <button
                className="faq-cat-btn"
                id="faq-cat-2-header"
                aria-expanded="false"
                aria-controls="faq-cat-2"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>For Customers</h3>
                    <p>
                      Posting jobs, receiving estimates, choosing contractors,
                      pickup verification, and support.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">11 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-2"
                role="region"
                aria-labelledby="faq-cat-2-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-1"
                      >
                        <span>How do I post a job?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers can create a job through Junk Run by
                              providing the required job information, including
                              photos, a description of what needs to be removed,
                              pickup information, and the pickup address.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-2"
                      >
                        <span>What information do I need to provide?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers should provide enough information for
                              contractors to understand the job and prepare an
                              estimate.
                            </p>
                            <p>This can include:</p>
                            <ul>
                              <li>Photos of the items</li>
                              <li>Description of the junk</li>
                              <li>Pickup address</li>
                              <li>Preferred pickup date</li>
                              <li>Pickup time</li>
                              <li>Other relevant job details</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-3"
                      >
                        <span>Do I need to upload photos?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Yes. Photos help contractors understand what needs
                              to be removed and determine an appropriate
                              estimate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-4"
                      >
                        <span>How do I receive estimates?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              After your job is posted, independent contractors
                              can review the job and submit their own estimates
                              through Junk Run.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-5"
                      >
                        <span>How do I choose a contractor?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              You review the available contractor estimates and
                              the information provided about the contractors,
                              then choose the contractor you want to perform the
                              job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-6"
                      >
                        <span>Can I choose which contractor I want?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes. The customer chooses the contractor.</p>
                            <p>
                              Junk Run does not automatically assign a
                              contractor to your job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-7"
                      >
                        <span>When is my payment authorized?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-7">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Your payment method must be verified before you
                              can post a job.
                            </p>
                            <p>
                              When you select a contractor, the payment is
                              authorized through the payment system and handled
                              according to Junk Run's payment workflow.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-8"
                      >
                        <span>How does pickup verification work?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-8">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run uses pickup verification features,
                              including GPS-based verification, to help confirm
                              that the assigned contractor has arrived at the
                              appropriate pickup location.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-9"
                      >
                        <span>
                          What happens if the contractor doesn't show up?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-9">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Junk Run has a 45-minute pickup window.</p>
                            <p>
                              The pickup window begins at the scheduled pickup
                              time.
                            </p>
                            <p>
                              At 30 minutes, the contractor receives a warning
                              that 15 minutes remain.
                            </p>
                            <p>
                              If the contractor does not complete the required
                              pickup process within the 45-minute window, the
                              job can be treated as a missed pickup.
                            </p>
                            <p>
                              The customer's payment can then be refunded
                              according to the missed-pickup process, and the
                              job can be reposted.
                            </p>
                            <p>
                              The contractor who missed the pickup is excluded
                              from that reposted job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-10"
                      >
                        <span>
                          What happens if there is a problem with my job?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-10">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers can contact Junk Run support to report a
                              problem with a job.
                            </p>
                            <p>
                              Disputes are reviewed case-by-case by Junk Run
                              support using the information available through
                              the platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-2-11"
                      >
                        <span>Can I review my contractor?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-2-11">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Customers can review contractors after completed
                              jobs, helping build contractor profiles and
                              reputation on the platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-3">
              <button
                className="faq-cat-btn"
                id="faq-cat-3-header"
                aria-expanded="false"
                aria-controls="faq-cat-3"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>For Haulers & Independent Contractors</h3>
                    <p>
                      Finding jobs, submitting estimates, payments, pickup
                      requirements, and contractor expectations.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">10 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-3"
                role="region"
                aria-labelledby="faq-cat-3-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-1"
                      >
                        <span>How do I become a contractor?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Contractors can sign up through Junk Run and
                              create their contractor profile.
                            </p>
                            <p>
                              They can then access available customer jobs and
                              choose opportunities that fit their business.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-2"
                      >
                        <span>Do I need an LLC?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>No.</p>
                            <p>
                              An LLC is not required to participate as an
                              independent contractor.
                            </p>
                            <p>
                              A contractor can operate in their own name. An LLC
                              is optional for contractors who choose to
                              establish a formal business entity.
                            </p>
                            <p>
                              Contractors remain responsible for their own
                              applicable licensing, permits, insurance, taxes,
                              and legal requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-3"
                      >
                        <span>Can I work independently?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Junk Run is designed for independent contractors
                              who choose which jobs they want to pursue and
                              determine their own estimates.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-4"
                      >
                        <span>How do I find jobs?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Contractors can browse available customer-posted
                              jobs through the Junk Run marketplace/HaulBoard.
                            </p>
                            <p>
                              Job listings can provide information such as
                              photos, descriptions, pickup information, and
                              other relevant details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-5"
                      >
                        <span>How do I submit an estimate?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              A contractor reviews a job and determines what
                              they believe the job will cost based on the
                              information provided.
                            </p>
                            <p>
                              The contractor then submits their estimate through
                              Junk Run.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-6"
                      >
                        <span>Can I set my own prices?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Contractors determine their own estimates for the
                              jobs they choose to pursue.
                            </p>
                            <p>
                              Junk Run does not operate the marketplace as a
                              live bidding war.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-7"
                      >
                        <span>How do I get paid?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-7">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Once a contractor completes the job and the
                              required completion process is satisfied, payment
                              is released according to Junk Run's payment
                              workflow.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-8"
                      >
                        <span>What happens after I am selected for a job?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-8">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Once the customer selects your estimate, the job
                              becomes assigned to you.
                            </p>
                            <p>
                              You are expected to arrive within the scheduled
                              pickup window, complete the work, and submit the
                              required completion information through Junk Run.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-9"
                      >
                        <span>What are the pickup-time requirements?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-9">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              The scheduled pickup time starts the 45-minute
                              pickup window.
                            </p>
                            <p>
                              At 30 minutes, the contractor receives a warning
                              that 15 minutes remain.
                            </p>
                            <p>
                              The contractor must complete the required pickup
                              process within the 45-minute window.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-3-10"
                      >
                        <span>What happens if I miss a scheduled pickup?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-3-10">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>A missed pickup can result in:</p>
                            <ul>
                              <li>
                                The customer's payment being refunded according
                                to the missed-pickup process
                              </li>
                              <li>The job being reposted</li>
                              <li>
                                The contractor being excluded from the reposted
                                job
                              </li>
                              <li>Contractor disciplinary action</li>
                            </ul>
                            <p>The Junk Run disciplinary structure is:</p>
                            <ul>
                              <li>1st missed pickup — Written warning</li>
                              <li>2nd missed pickup — 48-hour suspension</li>
                              <li>3rd missed pickup — 7-day suspension</li>
                              <li>4th missed pickup — Account deactivation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-4">
              <button
                className="faq-cat-btn"
                id="faq-cat-4-header"
                aria-expanded="false"
                aria-controls="faq-cat-4"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>Payments & Cancellations</h3>
                    <p>
                      Payment authorization, cancellations, fees, and contractor
                      cancellations.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">7 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-4"
                role="region"
                aria-labelledby="faq-cat-4-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-1"
                      >
                        <span>How does Junk Run handle payments?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run uses a payment-processing system to
                              handle customer payments.
                            </p>
                            <p>
                              The customer's payment method is verified before a
                              customer can post a job, and payment is handled
                              through the platform's payment workflow rather
                              than customers paying contractors directly through
                              the marketplace.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-2"
                      >
                        <span>When is the customer's payment authorized?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              The customer's payment is authorized when the
                              customer selects a contractor.
                            </p>
                            <p>
                              Payment is then handled according to Junk Run's
                              payment workflow and completion requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-3"
                      >
                        <span>Is my payment information protected?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Payment information is processed through the
                              payment provider integrated with Junk Run rather
                              than being directly handled by Junk Run's own
                              application servers.
                            </p>
                            <p>
                              Junk Run uses established payment-processing
                              infrastructure to handle payment information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-4"
                      >
                        <span>When does the contractor receive payment?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              The contractor receives payment after the job has
                              been completed and the required completion process
                              has been satisfied.
                            </p>
                            <p>
                              Completion evidence may include required photos
                              and other verification information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-5"
                      >
                        <span>Can I cancel my job?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Customers can cancel their job before the
                              scheduled pickup time without a cancellation fee.
                            </p>
                            <p>
                              If the customer cancels after the scheduled pickup
                              time begins, a 5% cancellation fee will apply.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-6"
                      >
                        <span>What happens if a contractor cancels?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              If a selected contractor cancels, the job
                              automatically returns to the marketplace.
                            </p>
                            <p>
                              The customer can then select another available
                              contractor estimate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-4-7"
                      >
                        <span>What happens if a job is cancelled?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-4-7">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              If the customer cancels before the scheduled
                              pickup time, there is no cancellation fee.
                            </p>
                            <p>
                              If the customer cancels after the scheduled pickup
                              time begins, a 5% cancellation fee applies.
                            </p>
                            <p>
                              If a contractor cancels, the job returns to the
                              marketplace so the customer can select another
                              available estimate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-5">
              <button
                className="faq-cat-btn"
                id="faq-cat-5-header"
                aria-expanded="false"
                aria-controls="faq-cat-5"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>Pickup & Completion</h3>
                    <p>
                      The 45-minute pickup window, GPS verification, completion
                      evidence, and contractor payment.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">6 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-5"
                role="region"
                aria-labelledby="faq-cat-5-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-1"
                      >
                        <span>What is the 45-minute pickup window?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              The 45-minute pickup window begins at the
                              scheduled pickup time.
                            </p>
                            <p>
                              Contractors are expected to complete the required
                              pickup process within that window.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-2"
                      >
                        <span>What happens at 30 minutes?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              At 30 minutes after the scheduled pickup time, the
                              contractor receives a notification that 15 minutes
                              remain in the pickup window.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-3"
                      >
                        <span>What happens at 45 minutes?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              If the required pickup process has not been
                              completed within 45 minutes, the job can be
                              treated as a missed pickup.
                            </p>
                            <p>
                              The customer can receive a refund according to the
                              missed-pickup process, and the job can be reposted
                              to the marketplace.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-4"
                      >
                        <span>How is the contractor's arrival verified?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run uses GPS-based pickup verification to
                              help confirm that the assigned contractor has
                              arrived at the appropriate pickup location.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-5"
                      >
                        <span>How is job completion verified?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Contractors are required to submit completion
                              information through Junk Run.
                            </p>
                            <p>
                              This can include required completion photos and
                              other information needed by the platform to verify
                              the job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-5-6"
                      >
                        <span>When is the contractor paid?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-5-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Payment is released to the contractor after the
                              required completion process has been satisfied.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-6">
              <button
                className="faq-cat-btn"
                id="faq-cat-6-header"
                aria-expanded="false"
                aria-controls="faq-cat-6"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>Reviews & Disputes</h3>
                    <p>
                      Customer and contractor reviews and the dispute-review
                      process.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">4 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-6"
                role="region"
                aria-labelledby="faq-cat-6-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-6-1"
                      >
                        <span>Can customers review contractors?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-6-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Customers can review contractors after completed
                              jobs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-6-2"
                      >
                        <span>Can contractors review customers?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-6-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Junk Run allows both customers and contractors to
                              review each other after completed jobs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-6-3"
                      >
                        <span>What happens if I have a dispute?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-6-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers or contractors can contact Junk Run
                              support regarding a dispute.
                            </p>
                            <p>
                              Disputes are reviewed case-by-case by Junk Run
                              support using the available information associated
                              with the job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-6-4"
                      >
                        <span>How does Junk Run review a dispute?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-6-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run support can review information associated
                              with the job, which may include job details,
                              payment information, pickup verification,
                              completion evidence, photos, and other relevant
                              platform records.
                            </p>
                            <p>
                              Each dispute is reviewed based on the
                              circumstances of the individual job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-7">
              <button
                className="faq-cat-btn"
                id="faq-cat-7-header"
                aria-expanded="false"
                aria-controls="faq-cat-7"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>Prohibited Items</h3>
                    <p>
                      Hazardous materials, prohibited items, and special
                      disposal.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">4 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-7"
                role="region"
                aria-labelledby="faq-cat-7-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-7-1"
                      >
                        <span>What items cannot be posted?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-7-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run does not allow prohibited or hazardous
                              materials to be posted for removal.
                            </p>
                            <p>
                              Customers should only post items that can legally
                              and safely be handled by the contractor they
                              select.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-7-2"
                      >
                        <span>Does Junk Run allow hazardous materials?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-7-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>No.</p>
                            <p>
                              Hazardous materials are prohibited from being
                              posted through Junk Run.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-7-3"
                      >
                        <span>
                          What should I do if I have something that requires
                          special disposal?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-7-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Customers should use an appropriate service that
                              is licensed and equipped to handle the particular
                              material.
                            </p>
                            <p>
                              Junk Run contractors should not accept prohibited
                              or hazardous materials through the platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-7-4"
                      >
                        <span>
                          What if I am unsure whether an item is allowed?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-7-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Do not post the item until you have confirmed that
                              it is permitted.
                            </p>
                            <p>
                              If you are unsure, contact Junk Run support before
                              posting the job.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq-cat" id="faq-cat-wrap-8">
              <button
                className="faq-cat-btn"
                id="faq-cat-8-header"
                aria-expanded="false"
                aria-controls="faq-cat-8"
              >
                <div className="faq-cat-left">
                  <span className="faq-cat-icon" aria-hidden="true" />
                  <div className="faq-cat-text">
                    <h3>Contractor Requirements</h3>
                    <p>
                      LLC requirements, independent contractor status,
                      licensing, equipment, and marketplace requirements.
                    </p>
                  </div>
                </div>
                <span className="faq-cat-count">8 Questions</span>
              </button>
              <div
                className="faq-cat-panel-wrap"
                id="faq-cat-8"
                role="region"
                aria-labelledby="faq-cat-8-header"
              >
                <div className="faq-cat-panel-inner">
                  <div className="faq-cat-body">
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-1"
                      >
                        <span>Do I need an LLC to become a contractor?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-1">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>No.</p>
                            <p>
                              An LLC is not required to participate as an
                              independent contractor.
                            </p>
                            <p>
                              Contractors may operate in their own name. An LLC
                              is optional for contractors who choose to
                              establish a formal business entity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-2"
                      >
                        <span>
                          Can I operate anywhere in the United States?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-2">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run is designed for nationwide U.S.
                              availability.
                            </p>
                            <p>
                              Contractors may operate in areas where they can
                              legally and practically provide their services,
                              subject to applicable local requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-3"
                      >
                        <span>Do contractors need licenses or permits?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-3">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Contractors are responsible for determining and
                              maintaining any licenses, permits, insurance,
                              registrations, and other requirements that apply
                              to their business and the services they provide.
                            </p>
                            <p>
                              Requirements can vary by state and local
                              jurisdiction.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-4"
                      >
                        <span>Are contractors employees of Junk Run?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-4">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>No.</p>
                            <p>
                              Junk Run is a technology marketplace that connects
                              customers with independent contractors.
                              Contractors are independent service providers and
                              are responsible for their own business operations
                              and applicable legal and tax obligations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-5"
                      >
                        <span>
                          Who is responsible for the contractor's vehicle and
                          equipment?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-5">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Independent contractors are responsible for
                              providing and maintaining their own vehicles,
                              equipment, tools, and other resources necessary to
                              perform the services they accept.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-6"
                      >
                        <span>
                          Can contractors choose which jobs they want?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-6">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Contractors can review available jobs and decide
                              which opportunities they want to pursue.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-7"
                      >
                        <span>Can contractors set their own estimates?</span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-7">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>Yes.</p>
                            <p>
                              Contractors determine their own estimates for the
                              jobs they choose to pursue.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faq-q">
                      <button
                        className="faq-q-btn"
                        aria-expanded="false"
                        aria-controls="faq-8-8"
                      >
                        <span>
                          What happens if a contractor repeatedly misses
                          pickups?
                        </span>
                        <span className="faq-q-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-8-8">
                        <div className="faq-a-inner">
                          <div className="faq-a">
                            <p>
                              Junk Run has a contractor accountability process:
                            </p>
                            <ul>
                              <li>1st missed pickup — Written warning</li>
                              <li>2nd missed pickup — 48-hour suspension</li>
                              <li>3rd missed pickup — 7-day suspension</li>
                              <li>4th missed pickup — Account deactivation</li>
                            </ul>
                            <p>
                              This process is designed to address repeated
                              missed pickups and help maintain reliable
                              marketplace operations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </div>
  );
}
