export * from "./user.schema"
export * from "./product.schema"
export * from "./order.schema"
export * from "./orderItem.schema"
export declare const schema: {
  users: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "users"
    schema: undefined
    columns: {
      id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id"
        tableName: "users"
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
      email: import("drizzle-orm/pg-core").PgColumn<{
        name: "email"
        tableName: "users"
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
      passwordHash: import("drizzle-orm/pg-core").PgColumn<{
        name: "password_hash"
        tableName: "users"
        dataType: "string"
        columnType: "PgText"
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
      name: import("drizzle-orm/pg-core").PgColumn<{
        name: "name"
        tableName: "users"
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
      role: import("drizzle-orm/pg-core").PgColumn<{
        name: "role"
        tableName: "users"
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
        tableName: "users"
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
        tableName: "users"
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
  usersRelations: import("drizzle-orm").Relations<"users", {
    orders: import("drizzle-orm").Many<"orders">
  }>
  products: import("drizzle-orm/pg-core").PgTableWithColumns<{
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
  productsRelations: import("drizzle-orm").Relations<"products", {
    orderItems: import("drizzle-orm").Many<"order_items">
  }>
  orders: import("drizzle-orm/pg-core").PgTableWithColumns<{
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
  ordersRelations: import("drizzle-orm").Relations<"orders", {
    user: import("drizzle-orm").One<"users", true>
    orderItems: import("drizzle-orm").Many<"order_items">
  }>
  orderItems: import("drizzle-orm/pg-core").PgTableWithColumns<{
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
  orderItemsRelations: import("drizzle-orm").Relations<"order_items", {
    order: import("drizzle-orm").One<"orders", true>
    product: import("drizzle-orm").One<"products", true>
  }>
}
