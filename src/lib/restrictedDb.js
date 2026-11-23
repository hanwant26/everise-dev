
import "server-only";

import pg from "pg";

const { Pool } = pg;

const connectionString =
  process.env.RESTRICTED_DATABASE_URL?.trim();

export const restrictedDatabaseConfigured = Boolean(
  connectionString &&
    (connectionString.startsWith("postgresql://") ||
      connectionString.startsWith("postgres://"))
);

const globalForDb = globalThis;

export function getRestrictedDbPool() {
  if (!restrictedDatabaseConfigured) {
    throw new Error(
      "Restricted database is not configured."
    );
  }

  if (!globalForDb.__everiseRestrictedDbPool) {
    globalForDb.__everiseRestrictedDbPool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: true,
      },
      max: 2,
      min: 0,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
      allowExitOnIdle: true,
      application_name: "everise-contact-api",
    });

    globalForDb.__everiseRestrictedDbPool.on(
      "error",
      (error) => {
        console.error(
          "[Restricted DB] Idle connection error:",
          error.message
        );
      }
    );
  }

  return globalForDb.__everiseRestrictedDbPool;
}
