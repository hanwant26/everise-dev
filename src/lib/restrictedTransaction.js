
import "server-only";

import { getRestrictedDbPool } from "@/lib/restrictedDb";

export async function withRestrictedTransaction(callback) {
  if (typeof callback !== "function") {
    throw new TypeError(
      "A transaction callback is required."
    );
  }

  const pool = getRestrictedDbPool();

  let client;
  let transactionStarted = false;
  let discardConnection = false;

  try {
    client = await pool.connect();

    await client.query("BEGIN");
    transactionStarted = true;

    await client.query(
      "SET LOCAL statement_timeout = '10s'"
    );

    await client.query(
      "SET LOCAL lock_timeout = '3s'"
    );

    await client.query(
      "SET LOCAL idle_in_transaction_session_timeout = '15s'"
    );

    await client.query(
      "SET LOCAL ROLE everise_contact_api"
    );

    const result = await callback(client);

    await client.query("COMMIT");
    transactionStarted = false;

    return result;
  } catch (error) {
    if (transactionStarted && client) {
      try {
        await client.query("ROLLBACK");
        transactionStarted = false;
      } catch (rollbackError) {
        discardConnection = true;

        console.error(
          "[Restricted DB] Transaction rollback failed.",
          rollbackError
        );
      }
    }

    throw error;
  } finally {
    if (client) {
      client.release(discardConnection);
    }
  }
}
