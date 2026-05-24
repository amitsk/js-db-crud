import { describe, expect, it } from "vitest";
import { createProductSchema, listProductsQuerySchema } from "./product.schema";

describe("product schemas", () => {
  it("defaults pagination values", () => {
    expect(listProductsQuerySchema.parse({})).toEqual({ limit: 10, offset: 0 });
  });

  it("validates money strings with up to two decimals", () => {
    expect(createProductSchema.safeParse({ name: "Keyboard", price: "129.99" }).success).toBe(true);
    expect(createProductSchema.safeParse({ name: "Keyboard", price: "129.999" }).success).toBe(
      false,
    );
  });
});
