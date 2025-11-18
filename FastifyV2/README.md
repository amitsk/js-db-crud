# FastifyV2 - Production-Ready Fastify + Drizzle ORM API

A complete, production-ready REST API built with Fastify, Drizzle ORM, PostgreSQL, TypeScript, and Zod validation. Features modular architecture with repository pattern, transactions, and comprehensive CRUD operations.

## 🚀 Features

- **Modern Stack**: Fastify 5.x, Drizzle ORM 0.33+, TypeScript 5.x, Zod 3.x
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Modular Architecture**: Clean separation with controller → service → repository pattern
- **Database**: PostgreSQL with Drizzle ORM and automatic migrations
- **Validation**: Request/response validation with Zod schemas
- **Security**: Helmet, CORS, compression middleware
- **Transactions**: Database transactions for atomic operations (order creation)
- **Relations**: Proper foreign keys and cascade deletes
- **Error Handling**: Global error handler with http-errors
- **Pagination**: Limit/offset pagination on list endpoints

## 📁 Project Structure

```
FastifyV2/
├── src/
│   ├── server.ts                 # Fastify instance + global plugins
│   ├── app.ts                    # Plugin & route registration
│   ├── config/
│   │   └── index.ts              # Environment validation with Zod
│   ├── db/
│   │   ├── index.ts              # Drizzle database instance
│   │   ├── schema/
│   │   │   ├── user.schema.ts
│   │   │   ├── product.schema.ts
│   │   │   ├── order.schema.ts
│   │   │   ├── orderItem.schema.ts
│   │   │   └── index.ts          # Schema barrel export
│   │   └── migrations/           # Generated migration files
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.routes.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.schema.ts    # Zod validation schemas
│   │   │   └── index.ts
│   │   ├── product/
│   │   │   ├── product.routes.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.repository.ts
│   │   │   ├── product.schema.ts
│   │   │   └── index.ts
│   │   └── order/
│   │       ├── order.routes.ts
│   │       ├── order.controller.ts
│   │       ├── order.service.ts
│   │       ├── order.repository.ts
│   │       ├── order.schema.ts
│   │       └── index.ts
│   ├── plugins/
│   │   └── drizzle.plugin.ts     # Drizzle plugin with 'db' decorator
│   ├── shared/
│   │   ├── decorators/
│   │   │   └── tx.decorator.ts   # Transaction helper
│   │   └── plugins/
│   │       └── auth.plugin.ts    # JWT auth stub
│   └── types/
│       └── index.d.ts            # Fastify type extensions
├── package.json
├── tsconfig.json
├── drizzle.config.ts
├── .env.example
├── .env.local                     # Create this file
└── README.md
```

## 📊 Database Schema

### **users** Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| email | varchar(255) | NOT NULL, UNIQUE |
| passwordHash | text | NOT NULL |
| name | varchar(255) | NOT NULL |
| role | varchar(50) | NOT NULL, DEFAULT 'customer' |
| createdAt | timestamp | NOT NULL, DEFAULT now() |
| updatedAt | timestamp | NOT NULL, DEFAULT now() |

**Relations**: User hasMany Orders

### **products** Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| name | varchar(255) | NOT NULL |
| description | text | NULL |
| price | numeric(10,2) | NOT NULL |
| stock | integer | NOT NULL, DEFAULT 0 |
| createdAt | timestamp | NOT NULL, DEFAULT now() |
| updatedAt | timestamp | NOT NULL, DEFAULT now() |

**Relations**: Product hasMany OrderItems

### **orders** Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| userId | integer | NOT NULL, FK → users.id (CASCADE) |
| totalAmount | numeric(10,2) | NOT NULL |
| status | varchar(50) | NOT NULL, DEFAULT 'pending' |
| createdAt | timestamp | NOT NULL, DEFAULT now() |
| updatedAt | timestamp | NOT NULL, DEFAULT now() |

**Status Enum**: pending, paid, shipped, delivered, cancelled

**Relations**:
- Order belongsTo User
- Order hasMany OrderItems

### **order_items** Table (Junction)
| Column | Type | Constraints |
|--------|------|-------------|
| orderId | integer | FK → orders.id (CASCADE) |
| productId | integer | FK → products.id (RESTRICT) |
| quantity | integer | NOT NULL |
| priceAtPurchase | numeric(10,2) | NOT NULL |

**Primary Key**: Composite (orderId, productId)

**Relations**:
- OrderItem belongsTo Order
- OrderItem belongsTo Product

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation Steps

1. **Clone and install dependencies**
```bash
cd FastifyV2
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fastifyv2
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
```

3. **Generate and run migrations**
```bash
# Generate migration files from schema
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Or use push for development (bypasses migrations)
npm run db:push
```

4. **Start development server**
```bash
npm run dev
```

Server will be running at `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /
```
Response:
```json
{
  "status": "ok",
  "message": "Fastify + Drizzle ORM API",
  "version": "2.0.0",
  "timestamp": "2025-11-17T12:00:00.000Z"
}
```

---

### Users API (`/api/users`)

#### List Users
```
GET /api/users?limit=10&offset=0
```
**Query Parameters:**
- `limit` (optional): Max results, default 10, max 100
- `offset` (optional): Skip N results, default 0

**Response:** Array of user objects (without passwordHash)

#### Get User by ID
```
GET /api/users/:id
```
**Response:** Single user object

#### Create User
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "role": "customer"  // optional: "customer" | "admin"
}
```
**Response:** Created user (201)

#### Update User
```
PUT /api/users/:id
Content-Type: application/json

{
  "email": "newemail@example.com",  // optional
  "name": "Jane Doe",                // optional
  "role": "admin"                    // optional
}
```
**Response:** Updated user object

#### Delete User
```
DELETE /api/users/:id
```
**Response:** `{ "message": "User deleted successfully" }`

---

### Products API (`/api/products`)

#### List Products
```
GET /api/products?limit=10&offset=0
```
**Query Parameters:**
- `limit` (optional): Max results, default 10, max 100
- `offset` (optional): Skip N results, default 0

**Response:** Array of product objects

#### Get Product by ID
```
GET /api/products/:id
```
**Response:** Single product object

#### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": "1299.99",
  "stock": 50
}
```
**Response:** Created product (201)

#### Update Product
```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Gaming Laptop",      // optional
  "description": "Updated desc", // optional
  "price": "1499.99",            // optional
  "stock": 45                    // optional
}
```
**Response:** Updated product object

#### Delete Product
```
DELETE /api/products/:id
```
**Response:** `{ "message": "Product deleted successfully" }`

---

### Orders API (`/api/orders`)

#### List Orders
```
GET /api/orders?limit=10&offset=0&userId=1&status=pending
```
**Query Parameters:**
- `limit` (optional): Max results, default 10, max 100
- `offset` (optional): Skip N results, default 0
- `userId` (optional): Filter by user ID
- `status` (optional): Filter by status (pending, paid, shipped, delivered, cancelled)

**Response:** Array of order objects with user details

#### Get Order by ID (with items)
```
GET /api/orders/:id
```
**Response:** Order object with user details and order items (including product info)

#### Create Order (Transaction)
```
POST /api/orders
Content-Type: application/json

{
  "userId": 1,
  "status": "pending",  // optional
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
```

**Transaction Flow:**
1. Validates user exists
2. Validates all products exist and have sufficient stock
3. Calculates total amount
4. Creates order
5. Creates order_items records
6. Updates product stock (decrements)
7. Returns complete order with items

**Response:** Complete order object with items (201)

#### Update Order Status
```
PUT /api/orders/:id
Content-Type: application/json

{
  "status": "shipped"  // pending | paid | shipped | delivered | cancelled
}
```
**Response:** Updated order object with items

#### Delete Order
```
DELETE /api/orders/:id
```
**Note:** Cascades to order_items automatically

**Response:** `{ "message": "Order deleted successfully" }`

---

## 🔒 Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

**Common Status Codes:**
- `400` - Bad Request (validation error, business logic error)
- `404` - Not Found
- `500` - Internal Server Error

**Validation errors** include a `details` array with field-specific errors.

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start dev server with hot reload (tsx watch)
npm run build       # Compile TypeScript to dist/
npm run start       # Run compiled JS (production)
npm run db:generate # Generate migration files from schema
npm run db:migrate  # Apply migrations to database
npm run db:push     # Push schema changes (dev only, bypasses migrations)
npm run db:studio   # Open Drizzle Studio GUI
```

### Database Management

**Generate Migration:**
```bash
npm run db:generate
```
Creates migration SQL files in `src/db/migrations/`

**Apply Migrations:**
```bash
npm run db:migrate
```

**Drizzle Studio (GUI):**
```bash
npm run db:studio
```
Opens a web interface to browse and edit database data

---

## 🏗️ Architecture Patterns

### Repository Pattern
Each module follows the layered architecture:
- **Routes**: Define endpoints and schema validation
- **Controller**: Handle HTTP request/response
- **Service**: Business logic and orchestration
- **Repository**: Database operations

### Transaction Example
Orders are created atomically:
```typescript
await db.transaction(async (tx) => {
  const order = await tx.insert(orders).values(...).returning();
  await tx.insert(orderItems).values(...);
  await tx.update(products).set({ stock: sql`stock - ${qty}` });
  return order;
});
```

### Type Safety
- Drizzle ORM provides inferred types from schema
- Zod validates runtime data
- TypeScript ensures compile-time type safety
- Fastify decorators are properly typed via `types/index.d.ts`

---

## 🔐 Security Notes

1. **Password Hashing**: The current implementation uses a stub (`hashed_${password}`). In production, use `bcrypt` or `argon2`:
   ```typescript
   import bcrypt from 'bcrypt';
   const passwordHash = await bcrypt.hash(password, 10);
   ```

2. **JWT Authentication**: Auth plugin is stubbed. Implement using `@fastify/jwt`:
   ```typescript
   await fastify.register(import('@fastify/jwt'), {
     secret: process.env.JWT_SECRET
   });
   ```

3. **CORS**: Configure properly for production in `server.ts`

4. **Environment Variables**: Never commit `.env.local` to version control

---

## 📦 Dependencies

### Production
- `fastify` (^5.2.0) - Web framework
- `drizzle-orm` (^0.33.0) - ORM
- `pg` (^8.13.1) - PostgreSQL driver
- `zod` (^3.23.8) - Schema validation
- `@fastify/type-provider-zod` (^5.0.0) - Zod integration
- `fastify-plugin` (^5.0.1) - Plugin system
- `http-errors` (^2.0.0) - HTTP error utilities
- `@fastify/cors` (^10.0.1) - CORS support
- `@fastify/helmet` (^12.0.1) - Security headers
- `@fastify/compress` (^8.0.1) - Response compression
- `dotenv` (^16.4.7) - Environment variables

### Development
- `typescript` (^5.7.2)
- `tsx` (^4.19.2) - TypeScript executor
- `drizzle-kit` (^0.24.2) - Migrations CLI
- `@types/*` - Type definitions

---

## 🚦 Next Steps

- [ ] Implement proper password hashing (bcrypt/argon2)
- [ ] Add JWT authentication
- [ ] Add API rate limiting
- [ ] Add request logging
- [ ] Add unit/integration tests
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add Docker support
- [ ] Add CI/CD pipeline

---

## 📄 License

ISC

---

**Built with ❤️ using Fastify + Drizzle ORM**
