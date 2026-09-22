"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PhotoDraft = { dataUrl: string; caption?: string };

const MAX_PHOTOS = 8;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB — data URLs are stored inline in Postgres for now.

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function NewJobForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<PhotoDraft[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setPhotoError(null);

    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setPhotoError(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const selected = Array.from(files).slice(0, remainingSlots);
    const next: PhotoDraft[] = [];

    for (const file of selected) {
      if (!file.type.startsWith("image/")) {
        setPhotoError("Only image files are supported.");
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setPhotoError("Each photo must be under 5MB.");
        continue;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        next.push({ dataUrl });
      } catch {
        setPhotoError("Couldn't read one of those files. Try again.");
      }
    }

    setPhotos((prev) => [...prev, ...next]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      title: String(data.get("title") || ""),
      description: String(data.get("description") || ""),
      pickupAddressLine1: String(data.get("pickupAddressLine1") || ""),
      pickupAddressLine2: String(data.get("pickupAddressLine2") || ""),
      city: String(data.get("city") || ""),
      state: String(data.get("state") || ""),
      zip: String(data.get("zip") || ""),
      pickupDate: String(data.get("pickupDate") || ""),
      photos,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const firstIssue =
          body?.issues?.fieldErrors &&
          Object.values(body.issues.fieldErrors).flat()[0];
        setError((firstIssue as string) || body?.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const { job } = await res.json();
      router.push(`/dashboard/jobs/${job.id}`);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="dash-error">{error}</div>}

      <div className="dash-form-row">
        <label htmlFor="title">Job title</label>
        <input
          id="title"
          name="title"
          className="dash-input"
          placeholder="e.g. Old couch and mattress removal"
          required
          maxLength={120}
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="description">Describe what needs to go</label>
        <textarea
          id="description"
          name="description"
          className="dash-textarea"
          placeholder="Item types, approximate quantity, stairs or tight access, anything contractors should know..."
          required
          maxLength={4000}
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="pickupAddressLine1">Pickup address</label>
        <input
          id="pickupAddressLine1"
          name="pickupAddressLine1"
          className="dash-input"
          placeholder="Street address"
          required
        />
      </div>

      <div className="dash-form-row">
        <label htmlFor="pickupAddressLine2">Apt / unit (optional)</label>
        <input
          id="pickupAddressLine2"
          name="pickupAddressLine2"
          className="dash-input"
        />
      </div>

      <div className="dash-form-grid-2">
        <div className="dash-form-row">
          <label htmlFor="city">City</label>
          <input id="city" name="city" className="dash-input" required />
        </div>
        <div className="dash-form-row">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            className="dash-input"
            maxLength={2}
            placeholder="e.g. MI"
            required
            style={{ textTransform: "uppercase" }}
          />
        </div>
      </div>

      <div className="dash-form-grid-2">
        <div className="dash-form-row">
          <label htmlFor="zip">ZIP code</label>
          <input id="zip" name="zip" className="dash-input" required />
        </div>
        <div className="dash-form-row">
          <label htmlFor="pickupDate">Preferred pickup date</label>
          <input
            id="pickupDate"
            name="pickupDate"
            type="date"
            className="dash-input"
            required
            min={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>

      <div className="dash-form-row">
        <label>Photos (optional, up to {MAX_PHOTOS})</label>
        <div
          className="dash-upload-drop"
          onClick={() => fileInputRef.current?.click()}
        >
          <p>Click to choose photos of the items or pile</p>
          <span className="dash-sub">JPG or PNG, up to 5MB each</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {photoError && <div className="dash-error">{photoError}</div>}
        {photos.length > 0 && (
          <div className="dash-photo-grid">
            {photos.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <div key={i} style={{ position: "relative" }}>
                <img src={p.dataUrl} alt="" className="dash-photo-thumb" />
                <button
                  type="button"
                  className="dash-photo-remove"
                  onClick={() => removePhoto(i)}
                  aria-label="Remove photo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
        style={{ marginTop: "8px" }}
      >
        {submitting ? "Posting…" : "Post Job & Request Estimates"}
      </button>
    </form>
  );
}
