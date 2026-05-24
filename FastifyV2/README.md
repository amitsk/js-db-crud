# FastifyV2 — Production-Ready Fastify & Drizzle ORM Dual-Architecture Backend

[![Fastify](https://img.shields.io/badge/Fastify-5.x-black?logo=fastify&logoColor=white&style=flat-square)](https://fastify.dev/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.33%2B-5c2d91?logo=drizzle&style=flat-square)](https://orm.drizzle.team/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-blue?logo=postgresql&logoColor=white&style=flat-square)](https://www.postgresql.org/)
[![Zod](https://img.shields.io/badge/Zod-3.x-violet?style=flat-square)](https://zod.dev/)

A production-ready, fully typed REST API with PostgreSQL, Fastify 5.x, Drizzle ORM, and Zod validation. The defining feature of this project is its **dual-architecture blueprint**, showcasing two completely functional implementations of the same API: a clean, minimal **Simple Version** and a structured, enterprise-level **Complex Version** using the Repository Pattern.

---

## 🎯 The Dual-Architecture Blueprint

This repository is designed as a learning resource and an architecture starter kit. It implements the exact same database schema and API endpoints using two separate structural philosophies:

```
                  ┌──────────────────────────────────────────────┐
                  │              Fastify HTTP Route              │
                  └──────────────────────┬───────────────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
         ⚡ SIMPLE ARCHITECTURE                       🏗️ COMPLEX ARCHITECTURE
         (Default & Recommended)                     (Enterprise Repository Pattern)
  ┌───────────────────────────────┐           ┌───────────────────────────────┐
  │ Route Handler (Inline Logic)  │           │   Controller (HTTP Handler)   │
  └──────────────┬────────────────┘           └──────────────┬────────────────┘
                 │                                           ▼
                 │                               ┌───────────────────────────────┐
                 │                               │    Service (Business Logic)   │
                 │                               └──────────────┬────────────────┘
                 │                                           ▼
                 │                               ┌───────────────────────────────┐
                 │                               │  Repository (Data Access)     │
                 │                               └──────────────┬────────────────┘
                 ▼                                           ▼
  ┌───────────────────────────────┐           ┌───────────────────────────────┐
  │      Drizzle ORM Database     │           │      Drizzle ORM Database     │
  └───────────────────────────────┘           └───────────────────────────────┘
```

### 📊 Side-by-Side Comparison

| Feature                  | ⚡ Simple Version (Recommended)         | 🏗️ Complex Version (Enterprise)                  |
| :----------------------- | :-------------------------------------- | :----------------------------------------------- |
| **Files**                | **13** (65% reduction)                  | **35**                                           |
| **Lines of Code**        | **~650**                                | **~2,000+**                                      |
| **Architectural Layers** | 1 (Routes → DB)                         | 4 (Routes → Controller → Service → Repository)   |
| **Code Locality**        | High (Logic in one place)               | Low (Distributed across 4 files)                 |
| **Testing Strategy**     | HTTP Integration / E2E                  | Isolated Unit Testing + Integration              |
| **Development Speed**    | ⚡ Extremely Fast                       | 🐢 Slow (Due to boilerplate)                     |
| **Ideal For**            | 90% of CRUD APIs, startups, small teams | Very large teams, complex rule engines, multi-DB |

---

## 🗂️ Project Directory Structure

Here is how the project files are laid out, highlighting which components belong to the Simple or Complex implementations:

```
FastifyV2/
├── src/
│   ├── server.simple.ts          # ⚡ Entry point for Simple Version (Default)
│   ├── app.simple.ts             # ⚡ Route definitions for Simple Version
│   │
│   ├── server.ts                 # 🏗️ Entry point for Complex Version
│   ├── app.ts                    # 🏗️ Plugin & route definitions for Complex Version
│   │
│   ├── config/
│   │   └── index.ts              # Zod-validated configuration schema
│   ├── db/
│   │   ├── index.ts              # pg Pool & Drizzle DB instance
│   │   ├── schema/               # Drizzle schemas (Shared by both versions)
│   │   │   ├── user.schema.ts
│   │   │   ├── product.schema.ts
│   │   │   ├── order.schema.ts
│   │   │   ├── orderItem.schema.ts
│   │   │   └── index.ts
│   │   └── migrations/           # Auto-generated SQL migrations
│   │
│   ├── modules/                  # Feature Modules
│   │   ├── user/
│   │   │   ├── user.routes.simple.ts  # ⚡ Simple handlers in single file
│   │   │   ├── user.routes.ts         # 🏗️ Complex routes
│   │   │   ├── user.controller.ts     # 🏗️ Complex controller layer
│   │   │   ├── user.service.ts        # 🏗️ Complex service layer
│   │   │   ├── user.repository.ts     # 🏗️ Complex repository layer
│   │   │   └── user.schema.ts         # Zod schemas (Shared)
│   │   ├── product/
│   │   │   ├── product.routes.simple.ts
│   │   │   ├── ... (etc.)
│   │   └── order/
│   │       ├── order.routes.simple.ts
│   │       ├── ... (etc.)
│   │
│   ├── plugins/
│   │   └── drizzle.plugin.ts     # Fastify Drizzle decorator plugin
│   ├── shared/
│   │   ├── decorators/
│   │   │   └── tx.decorator.ts   # TS decorator helper for transactions
│   │   └── plugins/
│   │       └── auth.plugin.ts    # JWT Authentication plugin (stub)
│   └── types/
│       └── index.d.ts            # Fastify Type Augmentations
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 24.x (uses native ESM, clean syntax)
- **PostgreSQL** 14+ database instance running

### Getting Started

1. **Clone the repository and install dependencies**

   ```bash
   cd FastifyV2
   npm install
   ```

2. **Configure your environment**
   Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and enter your database connection details:

   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastifyv2
   NODE_ENV=development
   PORT=3000
   HOST=0.0.0.0
   ```

3. **Initialize the database schema**
   Apply schemas directly to your PostgreSQL instance using Drizzle Kit:

   ```bash
   # Create database in postgres if not exists (using your terminal / pgAdmin)
   createdb fastifyv2

   # Push schema definitions immediately to database
   npm run db:push
   ```

4. **Start the development server**

   ```bash
   # Starts the SIMPLE version (Default, recommended)
   npm run dev

   # OR: Starts the COMPLEX version
   npm run dev:complex
   ```

---

## 🗄️ Database Schema & Relationships

The database is built on **4 tables** optimized with proper constraints, default values, and foreign key rules using Drizzle ORM.

### 📊 ERD Relationships

```mermaid
erDiagram
    users ||--o{ orders : "creates (1:M)"
    orders ||--|{ order_items : "contains (1:M)"
    products ||--o{ order_items : "referenced_by (1:M)"

    users {
        serial id PK
        varchar email UK
        text password_hash
        varchar name
        varchar role
        timestamp created_at
        timestamp updated_at
    }

    products {
        serial id PK
        varchar name
        text description
        numeric price
        integer stock
        timestamp created_at
        timestamp updated_at
    }

    orders {
        serial id PK
        integer user_id FK
        numeric total_amount
        varchar status
        timestamp created_at
        timestamp updated_at
    }

    order_items {
        integer order_id PK, FK
        integer product_id PK, FK
        integer quantity
        numeric price_at_purchase
    }
```

### Table Definitions

1. **`users`**: Customer and Admin records.
   - `email` is strictly validated as unique.
   - `role` defaults to `'customer'` (can also be `'admin'`).
2. **`products`**: Inventory items.
   - `price` utilizes `numeric(10, 2)` to ensure precision.
   - `stock` is kept as integer with a default of `0`.
3. **`orders`**: Customer transactions.
   - `userId` references `users.id` with `onDelete: "cascade"`.
   - `status` defaults to `'pending'`.
4. **`order_items`**: Junction table representing the many-to-many relationship between orders and products.
   - Composite primary key of `(orderId, productId)`.
   - `orderId` has `onDelete: "cascade"`.
   - `productId` has `onDelete: "restrict"` to prevent deletion of products that are already ordered.

---

## 📡 API Reference & Verification

Both versions share the exact same API contract. All JSON validation and response serialization are handled automatically via **Zod** integration.

### Endpoint Overview

| Resource     |  Method  | Path                | Description                  | Query/Body                                 |
| :----------- | :------: | :------------------ | :--------------------------- | :----------------------------------------- |
| **System**   |  `GET`   | `/`                 | Health Check                 | None                                       |
| **Users**    |  `GET`   | `/api/users`        | List Users (Paginated)       | `?limit=10&offset=0`                       |
|              |  `GET`   | `/api/users/:id`    | Get User by ID               | None                                       |
|              |  `POST`  | `/api/users`        | Create User                  | `email`, `password`, `name`, `role`        |
|              |  `PUT`   | `/api/users/:id`    | Update User details          | `email`, `name`, `role` (optional)         |
|              | `DELETE` | `/api/users/:id`    | Delete User                  | None                                       |
| **Products** |  `GET`   | `/api/products`     | List Products (Paginated)    | `?limit=10&offset=0`                       |
|              |  `GET`   | `/api/products/:id` | Get Product by ID            | None                                       |
|              |  `POST`  | `/api/products`     | Create Product               | `name`, `price`, `stock`, `description`    |
|              |  `PUT`   | `/api/products/:id` | Update Product details       | `name`, `price`, `stock` (optional)        |
|              | `DELETE` | `/api/products/:id` | Delete Product               | None                                       |
| **Orders**   |  `GET`   | `/api/orders`       | List Orders (Filtered)       | `?userId=1&status=pending`                 |
|              |  `GET`   | `/api/orders/:id`   | Get Order with Items         | None                                       |
|              |  `POST`  | `/api/orders`       | **Create Order (Atomic Tx)** | `userId`, `items: [{productId, quantity}]` |
|              |  `PUT`   | `/api/orders/:id`   | Update Order Status          | `status`                                   |
|              | `DELETE` | `/api/orders/:id`   | Delete Order                 | None                                       |

---

### 🔄 Atomic Transaction Flow (Order Creation)

When a customer checks out, the backend executes an **atomic transaction**:

1. Checks that the user exists.
2. Fetches and locks the requested products to check stock.
3. If stock is sufficient, calculates the total amount, deducts the stock from products, inserts the order, and creates the order items.
4. If any step fails (e.g. out of stock), the transaction rolls back completely.

### 🧪 Live Testing Commands (curl)

Ensure your server is running (`npm run dev`), then use these quick commands to test:

#### 1. Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secure_password","name":"Alice Carter"}'
```

#### 2. Create a Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Mechanical Keyboard","price":"89.99","stock":15,"description":"RGB mechanical keyboard"}'
```

#### 3. Checkout (Atomic Order Creation)

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"items":[{"productId":1,"quantity":2}]}'
```

#### 4. List All Orders (Including items and customer details)

```bash
curl http://localhost:3000/api/orders
```

---

## 🛠️ Verification & Development Commands

```bash
# Code Quality Checks
npm run typecheck         # Verify type definitions compile clean
npm run lint              # Run oxlint for blazingly fast lint check
npm run format:check      # Check formatting with oxfmt
npm run format            # Fix formatting across the codebase

# Test Runner
npm run test              # Execute Vitest test suite once
npm run test:watch        # Keep Vitest running in watch mode

# Drizzle Database CLI
npm run db:generate       # Generate SQL migrations file from schema
npm run db:migrate        # Execute migrations against database
npm run db:push           # Push local typescript schema updates to db (dev)
npm run db:studio         # Open visual database browser GUI on localhost:4983
```

---

## 📚 Documentation Portal

Explore the specific architectural detailed walkthroughs and comparison guides below:

1. **[WHICH_VERSION.md](WHICH_VERSION.md)**: A structured decision matrix helping you pick the right architecture for your team size and system complexity.
2. **[README_SIMPLE.md](README_SIMPLE.md)**: Full deep-dive into the recommended lightweight, zero-boilerplate route architecture.
3. **[README_COMPLEX.md](README_COMPLEX.md)**: Detailed breakdown of the enterprise multi-layered repository pattern implementation.
4. **[ARCHITECTURE_COMPARISON.md](ARCHITECTURE_COMPARISON.md)**: In-depth code-by-code and file-by-file comparison of the two architectures.
5. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**: High-level system statistics, core libraries, and implementation features list.
6. **[QUICKSTART.md](QUICKSTART.md)**: 5-minute fast setup checklist.
7. **[CHECKLIST.md](CHECKLIST.md)**: Step-by-step developer checklist for starting a new module.

---

**Built with ❤️ using Fastify 5.x, Drizzle ORM, Zod, and Clean Architecture Principles.**
