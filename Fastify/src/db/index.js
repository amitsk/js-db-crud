import { config } from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema.js";

config({ path: "../../.env.local" });

const client = new Database(process.env.DATABASE_URL || "db.sqlite");
export const db = drizzle(client, { schema });
