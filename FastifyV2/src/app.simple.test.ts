import Fastify from "fastify";
import { afterEach, describe, expect, it } from "vitest";
import { registerRoutes } from "./app.simple";

const app = Fastify({ logger: false });

afterEach(async () => {
  await app.close();
});

describe("simple app routes", () => {
  it("responds to the health check", async () => {
    await registerRoutes(app);

    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      status: "ok",
      message: "Fastify + Drizzle ORM API",
    });
  });
});
