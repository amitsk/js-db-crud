import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	price: real("price").notNull(),
	description: text("description"),
	createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const orders = sqliteTable("orders", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	productId: integer("product_id")
		.notNull()
		.references(() => products.id),
	quantity: integer("quantity").notNull(),
	createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const usersRelations = relations(users, ({ many }) => ({
	orders: many(orders),
}));

export const productsRelations = relations(products, ({ many }) => ({
	orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	product: one(products, {
		fields: [orders.productId],
		references: [products.id],
	}),
}));
