
import "server-only";

import { createRestrictedDbClient } from "@/lib/restrictedDb";

export async function withRestrictedTransaction(callback) {
  if (typeof callback !== "function") {
    throw new TypeError("A transaction callback is required.");
  }

  const client = createRestrictedDbClient();

  let connected = false;
  let transactionStarted = false;

  try {
    await client.connect();
    connected = true;

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
    if (transactionStarted) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error(
          "[Restricted DB] Transaction rollback failed.",
          rollbackError
        );
      }
    }

    throw error;
  } finally {
    if (connected) {
      try {
        await client.end();
      } catch (closeError) {
        console.error(
          "[Restricted DB] Connection cleanup failed.",
          closeError
        );
      }
    }
  }
}
