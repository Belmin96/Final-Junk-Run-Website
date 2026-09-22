// Parses a `data:<contentType>;base64,<data>` URL (what the browser's
// FileReader.readAsDataURL produces, and what NewJobForm.tsx sends) into raw
// bytes + content type, so the server can upload it to R2 instead of storing
// the data URL itself.
export function parseDataUrl(
  dataUrl: string
): { contentType: string; bytes: ArrayBuffer } | null {
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(dataUrl);
  if (!match) return null;

  const [, contentType, base64] = match;
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return { contentType, bytes: bytes.buffer };
  } catch {
    return null;
  }
}
