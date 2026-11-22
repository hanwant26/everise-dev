
import "server-only";

import { neon } from "@neondatabase/serverless";

// Read the database connection string from the server environment.
const databaseUrl = process.env.DATABASE_URL?.trim();

// Check whether the connection string is configured.
export const databaseConfigured = Boolean(
  databaseUrl &&
  (databaseUrl.startsWith("postgresql://") ||
    databaseUrl.startsWith("postgres://"))
);

// Create a Neon SQL client only when configured.
export const sql = databaseConfigured
  ? neon(databaseUrl, {
      fetchOptions: {
        cache: "no-store",
      },
    })
  : null;
