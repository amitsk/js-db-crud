import { describe, expect, it } from "vitest";
import { createUserSchema, listUsersQuerySchema, userIdParamSchema } from "./user.schema";

describe("user schemas", () => {
  it("coerces ids and pagination query values", () => {
    expect(userIdParamSchema.parse({ id: "42" })).toEqual({ id: 42 });
    expect(listUsersQuerySchema.parse({})).toEqual({ limit: 10, offset: 0 });
    expect(listUsersQuerySchema.parse({ limit: "25", offset: "5" })).toEqual({
      limit: 25,
      offset: 5,
    });
  });

  it("validates user creation input", () => {
    expect(
      createUserSchema.parse({
        email: "amit@example.com",
        password: "password123",
        name: "Amit",
      }),
    ).toMatchObject({
      email: "amit@example.com",
      name: "Amit",
      role: "customer",
    });
  });
});
