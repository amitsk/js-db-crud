"use strict"
//# sourceMappingURL=product.schema.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.productsRelations = exports.products = void 0
const pg_core_1 = require("drizzle-orm/pg-core")
const drizzle_orm_1 = require("drizzle-orm")
const orderItem_schema_1 = require("./orderItem.schema")
exports.products = (0, pg_core_1.pgTable)("products", {
  id: (0, pg_core_1.serial)("id").primaryKey(),
  name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
  description: (0, pg_core_1.text)("description"),
  price: (0, pg_core_1.numeric)("price", { precision: 10, scale: 2 }).notNull(),
  stock: (0, pg_core_1.integer)("stock").notNull().default(0),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
})
exports.productsRelations = (0, drizzle_orm_1.relations)(
  exports.products,
  ({ many }) => ({
    orderItems: many(orderItem_schema_1.orderItems),
  }),
)
