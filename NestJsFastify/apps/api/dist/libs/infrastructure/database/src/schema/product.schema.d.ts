export declare const products: import("drizzle-orm/pg-core").PgTableWithColumns<{
  name: "products"
  schema: undefined
  columns: {
    id: import("drizzle-orm/pg-core").PgColumn<{
      name: "id"
      tableName: "products"
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
    name: import("drizzle-orm/pg-core").PgColumn<{
      name: "name"
      tableName: "products"
      dataType: "string"
      columnType: "PgVarchar"
      data: string
      driverParam: string
      notNull: true
      hasDefault: false
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: [string, ...string[]]
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<string>
    }, {}, {}>
    description: import("drizzle-orm/pg-core").PgColumn<{
      name: "description"
      tableName: "products"
      dataType: "string"
      columnType: "PgText"
      data: string
      driverParam: string
      notNull: false
      hasDefault: false
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: [string, ...string[]]
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<string>
    }, {}, {}>
    price: import("drizzle-orm/pg-core").PgColumn<{
      name: "price"
      tableName: "products"
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
    stock: import("drizzle-orm/pg-core").PgColumn<{
      name: "stock"
      tableName: "products"
      dataType: "number"
      columnType: "PgInteger"
      data: number
      driverParam: string | number
      notNull: true
      hasDefault: true
      isPrimaryKey: false
      isAutoincrement: false
      hasRuntimeDefault: false
      enumValues: undefined
      baseColumn: never
      generated: import("drizzle-orm").GeneratedColumnConfig<number>
    }, {}, {}>
    createdAt: import("drizzle-orm/pg-core").PgColumn<{
      name: "created_at"
      tableName: "products"
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
      tableName: "products"
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
export declare const productsRelations: import("drizzle-orm").Relations<"products", {
  orderItems: import("drizzle-orm").Many<"order_items">
}>
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
