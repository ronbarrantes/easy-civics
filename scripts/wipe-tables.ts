import { sql } from "drizzle-orm";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "readline/promises";

import { db } from "@/server/db";
import { answer, question } from "@/server/db/schema";

/**
 * Prompts the user for confirmation and truncates the `answer` and `question` database tables, resetting their identity sequences.
 *
 * @remark
 * The process exits with code 0 on successful completion or user abort, and with code 1 if truncation fails.
 */
async function wipeTables() {
  const rl = createInterface({ input, output });

  const confirmation = await rl.question(
    "⚠️  Are you sure you want to truncate the tables? (yes/no) "
  );

  rl.close();

  if (confirmation.toLowerCase() !== "yes") {
    console.log("❌ Aborting truncate. No changes made.");
    process.exit(0);
  }

  try {
    console.log("🚀 Truncating tables...");

    await db.execute(sql`
      TRUNCATE TABLE
        ${answer},
        ${question}
      RESTART IDENTITY CASCADE
    `);

    console.log("✅ Successfully truncated and reset tables!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Truncate failed:", error);
    process.exit(1);
  }
}

wipeTables();
