"use strict"
//# sourceMappingURL=orderItem.schema.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.orderItemsRelations = exports.orderItems = void 0
const pg_core_1 = require("drizzle-orm/pg-core")
const drizzle_orm_1 = require("drizzle-orm")
const order_schema_1 = require("./order.schema")
const product_schema_1 = require("./product.schema")
exports.orderItems = (0, pg_core_1.pgTable)(
  "order_items",
  {
    orderId: (0, pg_core_1.integer)("order_id")
      .notNull()
      .references(() => order_schema_1.orders.id, { onDelete: "cascade" }),
    productId: (0, pg_core_1.integer)("product_id")
      .notNull()
      .references(() => product_schema_1.products.id, { onDelete: "restrict" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    priceAtPurchase: (0, pg_core_1.numeric)("price_at_purchase", {
      precision: 10,
      scale: 2,
    }).notNull(),
  },
  (table) => ({
    pk: (0, pg_core_1.primaryKey)({
      columns: [table.orderId, table.productId],
    }),
  }),
)
exports.orderItemsRelations = (0, drizzle_orm_1.relations)(
  exports.orderItems,
  ({ one }) => ({
    order: one(order_schema_1.orders, {
      fields: [exports.orderItems.orderId],
      references: [order_schema_1.orders.id],
    }),
    product: one(product_schema_1.products, {
      fields: [exports.orderItems.productId],
      references: [product_schema_1.products.id],
    }),
  }),
)
