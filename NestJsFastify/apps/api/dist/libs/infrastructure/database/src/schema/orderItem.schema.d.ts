export declare const orderItems: import("drizzle-orm/pg-core").PgTableWithColumns<{
  name: "order_items"
  schema: undefined
  columns: {
    orderId: import("drizzle-orm/pg-core").PgColumn<{
      name: "order_id"
      tableName: "order_items"
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
    productId: import("drizzle-orm/pg-core").PgColumn<{
      name: "product_id"
      tableName: "order_items"
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
    quantity: import("drizzle-orm/pg-core").PgColumn<{
      name: "quantity"
      tableName: "order_items"
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
    priceAtPurchase: import("drizzle-orm/pg-core").PgColumn<{
      name: "price_at_purchase"
      tableName: "order_items"
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
  }
  dialect: "pg"
}>
export declare const orderItemsRelations: import("drizzle-orm").Relations<"order_items", {
  order: import("drizzle-orm").One<"orders", true>
  product: import("drizzle-orm").One<"products", true>
}>
export type OrderItem = typeof orderItems.$inferSelect
export type NewOrderItem = typeof orderItems.$inferInsert
