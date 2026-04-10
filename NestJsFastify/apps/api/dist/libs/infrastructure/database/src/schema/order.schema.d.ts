export declare const orders: import("drizzle-orm/pg-core").PgTableWithColumns<{
  name: "orders"
  schema: undefined
  columns: {
    id: import("drizzle-orm/pg-core").PgColumn<{
      name: "id"
      tableName: "orders"
      dataType: "number"
      columnType: "PgSerial"
      data: number
      driverParam: number
      notNull: true
      hasDefault: true
      isPrimaryKey: true
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<number>
    }, {}, {}>
    userId: import("drizzle-orm/pg-core").PgColumn<{
      name: "user_id"
      tableName: "orders"
      dataType: "number"
      columnType: "PgInteger"
      data: number
      driverParam: string | number
      notNull: true
      hasDefault: false
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<number>
    }, {}, {}>
    totalAmount: import("drizzle-orm/pg-core").PgColumn<{
      name: "total_amount"
      tableName: "orders"
      dataType: "string"
      columnType: "PgNumeric"
      data: string
      driverParam: string
      notNull: true
      hasDefault: false
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<string>
    }, {}, {}>
    status: import("drizzle-orm/pg-core").PgColumn<{
      name: "status"
      tableName: "orders"
      dataType: "string"
      columnType: "PgVarchar"
      data: string
      driverParam: string
      notNull: true
      hasDefault: true
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: [string, ...string[]]
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<string>
    }, {}, {}>
    createdAt: import("drizzle-orm/pg-core").PgColumn<{
      name: "created_at"
      tableName: "orders"
      dataType: "date"
      columnType: "PgTimestamp"
      data: Date
      driverParam: string
      notNull: true
      hasDefault: true
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<Date>
    }, {}, {}>
    updatedAt: import("drizzle-orm/pg-core").PgColumn<{
      name: "updated_at"
      tableName: "orders"
      dataType: "date"
      columnType: "PgTimestamp"
      data: Date
      driverParam: string
      notNull: true
      hasDefault: true
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<Date>
    }, {}, {}>
  }
  dialect: "pg"
}>
export declare const ordersRelations: import("drizzle-orm").Relations<"orders", {
  user: import("drizzle-orm").One<"users", true>
  orderItems: import("drizzle-orm").Many<"order_items">
}>
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
