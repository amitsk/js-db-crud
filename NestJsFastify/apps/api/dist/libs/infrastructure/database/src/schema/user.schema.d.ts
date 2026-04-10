export declare const users: import("drizzle-orm/pg-core").PgTableWithColumns<{
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
export declare const usersRelations: import("drizzle-orm").Relations<"users", {
  orders: import("drizzle-orm").Many<"orders">
}>
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
