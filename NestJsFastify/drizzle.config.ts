import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./libs/infrastructure/database/src/schema/index.ts",
  out: "./libs/infrastructure/database/src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env['DATABASE_URL'] ||
      "postgresql://user:password@localhost:5432/fastifyv2",
  },
})
