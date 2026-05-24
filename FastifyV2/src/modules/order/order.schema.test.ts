import { describe, expect, it } from "vitest";
import { createOrderSchema, listOrdersQuerySchema } from "./order.schema";

describe("order schemas", () => {
  it("defaults list query values", () => {
    expect(listOrdersQuerySchema.parse({})).toEqual({ limit: 10, offset: 0 });
  });

  it("requires at least one order item", () => {
    expect(createOrderSchema.safeParse({ userId: 1, items: [] }).success).toBe(false);
    expect(
      createOrderSchema.parse({
        userId: 1,
        items: [{ productId: 2, quantity: 3 }],
      }),
    ).toMatchObject({
      userId: 1,
      status: "pending",
    });
  });
});
