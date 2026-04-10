"use strict"
//# sourceMappingURL=user.schema.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.usersRelations = exports.users = void 0
const pg_core_1 = require("drizzle-orm/pg-core")
const drizzle_orm_1 = require("drizzle-orm")
const order_schema_1 = require("./order.schema")
exports.users = (0, pg_core_1.pgTable)("users", {
  id: (0, pg_core_1.serial)("id").primaryKey(),
  email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
  passwordHash: (0, pg_core_1.text)("password_hash").notNull(),
  name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
  role: (0, pg_core_1.varchar)("role", { length: 50 })
    .notNull()
    .default("customer"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
})
exports.usersRelations = (0, drizzle_orm_1.relations)(
  exports.users,
  ({ many }) => ({
    orders: many(order_schema_1.orders),
  }),
)
