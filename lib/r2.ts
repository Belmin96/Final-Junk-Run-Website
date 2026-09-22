import { getCloudflareContext } from "@opennextjs/cloudflare";

// Minimal local shape of the R2Bucket binding API (just the three methods
// this file uses) instead of depending on @cloudflare/workers-types --
// that package redefines global DOM types (Request/Response/etc.) project
// -wide, which collides with Next.js's own types elsewhere in the app.
interface MinimalR2Bucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
  get(key: string): Promise<{
    body: ReadableStream;
    httpMetadata?: { contentType?: string };
  } | null>;
  delete(key: string): Promise<void>;
}

// Job photos are stored in the JOB_PHOTOS R2 bucket (binding declared in
// wrangler.jsonc) instead of as base64 data: URLs in Postgres. Object keys
// look like `jobs/<jobId>/<photoId>`.
//
// getCloudflareContext() only resolves the real binding when running under
// `wrangler dev` / `opennextjs-cloudflare preview` / the deployed Worker.
// Plain `next dev` has no Workers runtime underneath it, so this throws
// there -- see the try/catch at each call site, which falls back to
// rejecting the upload with a clear error rather than crashing.
function bucket(): MinimalR2Bucket {
  const { env } = getCloudflareContext();
  const b = (env as unknown as Record<string, MinimalR2Bucket>).JOB_PHOTOS;
  if (!b) {
    throw new Error(
      "JOB_PHOTOS R2 binding not available (are you running `npm run dev` instead of `npm run preview`?)"
    );
  }
  return b;
}

export async function putJobPhoto(
  key: string,
  data: ArrayBuffer,
  contentType: string
): Promise<void> {
  await bucket().put(key, data, { httpMetadata: { contentType } });
}

export async function getJobPhoto(
  key: string
): Promise<{ body: ReadableStream; contentType: string } | null> {
  const obj = await bucket().get(key);
  if (!obj) return null;
  return {
    body: obj.body,
    contentType: obj.httpMetadata?.contentType ?? "application/octet-stream",
  };
}

export async function deleteJobPhoto(key: string): Promise<void> {
  await bucket().delete(key);
}
