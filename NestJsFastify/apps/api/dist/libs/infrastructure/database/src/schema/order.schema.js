"use strict"
//# sourceMappingURL=order.schema.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ordersRelations = exports.orders = void 0
const pg_core_1 = require("drizzle-orm/pg-core")
const drizzle_orm_1 = require("drizzle-orm")
const user_schema_1 = require("./user.schema")
const orderItem_schema_1 = require("./orderItem.schema")
exports.orders = (0, pg_core_1.pgTable)("orders", {
  id: (0, pg_core_1.serial)("id").primaryKey(),
  userId: (0, pg_core_1.integer)("user_id")
    .notNull()
    .references(() => user_schema_1.users.id, { onDelete: "cascade" }),
  totalAmount: (0, pg_core_1.numeric)("total_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  status: (0, pg_core_1.varchar)("status", { length: 50 })
    .notNull()
    .default("pending"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
})
exports.ordersRelations = (0, drizzle_orm_1.relations)(
  exports.orders,
  ({ one, many }) => ({
    user: one(user_schema_1.users, {
      fields: [exports.orders.userId],
      references: [user_schema_1.users.id],
    }),
    orderItems: many(orderItem_schema_1.orderItems),
  }),
)
