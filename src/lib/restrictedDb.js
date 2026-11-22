
import "server-only";

import pg from "pg";

const { Client } = pg;

/**
 * Restricted PostgreSQL connection configuration.
 *
 * This module does not connect automatically.
 * It will be used after the restricted credentials
 * and database permissions are fully verified.
 */

const connectionString =
  process.env.RESTRICTED_DATABASE_URL?.trim();

export const restrictedDatabaseConfigured = Boolean(
  connectionString &&
    (connectionString.startsWith("postgresql://") ||
      connectionString.startsWith("postgres://"))
);

/**
 * Create a new PostgreSQL client.
 *
 * The caller is responsible for:
 * - Connecting to PostgreSQL
 * - Beginning a transaction
 * - Applying transaction-local role and timeouts
 * - Committing or rolling back
 * - Closing the connection
 */
export function createRestrictedDbClient() {
  if (!restrictedDatabaseConfigured) {
    throw new Error(
      "Restricted database is not configured."
    );
  }

  return new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: true,
    },
    connectionTimeoutMillis: 10000,
    application_name: "everise-contact-api",
  });
}
