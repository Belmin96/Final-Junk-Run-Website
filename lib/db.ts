import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

// Cloudflare Workers has a native WebSocket implementation; plain Node.js
// (running `npm run dev` / `npm run start` on your own machine, outside
// Workers) may not, depending on version, so this falls back to the `ws`
// package there. Either way, Neon's driver talks to Postgres over
// WebSocket/HTTP instead of a raw TCP connection, which is what lets this
// same code run unchanged in the Workers runtime (no TCP sockets there)
// and in a normal Node process.
if (typeof WebSocket === "undefined") {
  // Lazy require so this only pulls in the `ws` package on runtimes that
  // actually need it.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  neonConfig.webSocketConstructor = require("ws");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Thrown lazily (only when a query actually runs), same pattern as
    // lib/stripe.ts -- so pages/routes that don't touch the database still
    // build without the env var set.
    console.warn(
      "DATABASE_URL is not set -- database-dependent routes will fail until it is."
    );
  }

  const adapter = new PrismaNeon({ connectionString: connectionString ?? "" });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Prevent creating a new PrismaClient (and a new connection pool) on every
// hot-reload in dev.
export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
