"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({
  jobId,
  contractorName,
}: {
  jobId: string;
  contractorName: string;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) {
      setError("Pick a star rating first.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Couldn't submit your review. Try again.");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="dash-card">
      <h3 style={{ margin: "0 0 4px" }}>Leave a Review</h3>
      <p className="dash-sub" style={{ marginBottom: "12px" }}>
        How did it go with {contractorName}?
      </p>

      {error && <div className="dash-error">{error}</div>}

      <div className="dash-stars" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            className="dash-star-btn"
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
            style={{
              color: n <= (hoverRating || rating) ? "var(--green)" : "var(--line)",
            }}
          >
            ★
          </button>
        ))}
      </div>

      <div className="dash-form-row" style={{ marginTop: "12px" }}>
        <label htmlFor="comment">Comments (optional)</label>
        <textarea
          id="comment"
          className="dash-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How was communication, timeliness, and care with your space?"
          maxLength={2000}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
