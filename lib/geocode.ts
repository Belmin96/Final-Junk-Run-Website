// Best-effort address -> lat/lng geocoding, used when a job is created so
// the GPS arrival check (lib/timing.ts) has something to compare against.
//
// Uses OpenStreetMap's free Nominatim API -- no API key required, which
// keeps this from needing another secret. It's rate-limited (max ~1
// request/second, and asks for a descriptive User-Agent, both handled
// below) which is fine at this app's current volume. If this app's job
// volume grows, swap this for a paid geocoder (Google Maps, Mapbox) with
// better rate limits and accuracy -- the call site (app/api/jobs/route.ts)
// doesn't need to change, just this function.
export async function geocodeAddress(address: {
  line1: string;
  city: string;
  state: string;
  zip: string;
}): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const query = `${address.line1}, ${address.city}, ${address.state} ${address.zip}, USA`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        // Nominatim's usage policy requires a descriptive User-Agent
        // identifying the application (not a browser UA string).
        "User-Agent": "JunkRunApp/1.0 (junkrunapp.com)",
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;

    const results = (await res.json()) as Array<{ lat: string; lon: string }>;
    const first = results[0];
    if (!first) return null;

    const latitude = Number.parseFloat(first.lat);
    const longitude = Number.parseFloat(first.lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return { latitude, longitude };
  } catch {
    // Geocoding is best-effort -- a failure here shouldn't block job
    // creation, it just means arrival can't be GPS-verified for this job.
    return null;
  }
}
