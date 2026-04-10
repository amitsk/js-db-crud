# NestJS Fastify Monolith

A production-ready REST API migrated from Fastify to NestJS + Fastify adapter, featuring clean modular architecture, Drizzle ORM, PostgreSQL, and Zod validation.

## 🚀 Features

- **Modern Stack**: NestJS 11.x, Fastify adapter, Drizzle ORM 0.45+, TypeScript 6.x, Zod 4.x
- **ES Modules**: Configured for modern JavaScript with ES2022 modules
- **Node.js 24**: Pinned to latest LTS with .nvmrc and engines specification
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Modular Architecture**: Clean separation with domain-driven design (DDD) layers
- **Database**: PostgreSQL with Drizzle ORM and automatic migrations
- **Validation**: Request/response validation with Zod schemas
- **Security**: Helmet, CORS, compression middleware (inherited from Fastify)
- **Transactions**: Database transactions support
- **Relations**: Proper foreign keys and cascade deletes
- **Error Handling**: Global error handler with http-errors
- **Pagination**: Limit/offset pagination on list endpoints
- **Fast Linting**: oxlint for lightning-fast code linting (6ms vs traditional 2-5s)
- **Fast Formatting**: oxfmt for rapid code formatting (3ms)

## 📁 Project Structure

```
NestJsFastify/
├── apps/
│   └── api/                  # Main NestJS app (using Fastify adapter)
├── libs/
│   ├── core/                 # Shared kernel (config, db, utils, decorators, exceptions)
│   │   ├── src/
│   │   │   ├── config/       # Environment validation with Zod
│   │   │   ├── database/     # Drizzle database instance
│   │   │   ├── decorators/   # Transaction decorator
│   │   │   ├── exceptions/   # Http exceptions
│   │   │   └── utils/        # Pagination helpers
│   ├── shared/               # Common utilities, zod schemas, types
│   ├── domain/               # Domain modules
│   │   ├── user/
│   │   │   ├── src/
│   │   │   │   ├── domain/       # Entities, repository interfaces
│   │   │   │   ├── application/  # Use-cases / services
│   │   │   │   ├── infrastructure/ # Drizzle repositories
│   │   │   │   └── presentation/ # NestJS controllers, DTOs
│   │   ├── product/
│   │   └── order/
│   └── infrastructure/
│       └── database/         # Drizzle schema definitions
├── tools/
└── nx.json, tsconfig.base.json, etc.
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 24+ (pinned in .nvmrc)
- PostgreSQL 14+
- npm or pnpm

### Installation Steps

1. **Set up Node.js version**
```bash
# Using nvm (recommended)
nvm use

# Or using mise
mise use
```

2. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fastifyv2
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
```

3. **Set up database**
```bash
# Generate migration files from schema
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Or use push for development
npm run db:push
```

4. **Build and run**
```bash
# Build the application
npm run build

# Start the application
npm run serve
```

Server will be running at `http://localhost:3000`

## 📡 API Endpoints

### Users API (`/api/users`)
- `GET /api/users` - List users with pagination
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products API (`/api/products`)
- `GET /api/products` - List products with pagination
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders API (`/api/orders`)
- `GET /api/orders` - List orders with pagination
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🏗️ Architecture Overview

This application follows Domain-Driven Design (DDD) principles with clean architecture:

- **Presentation Layer**: NestJS controllers with Zod DTOs
- **Application Layer**: Use cases and services
- **Domain Layer**: Business entities and repository interfaces
- **Infrastructure Layer**: Database implementations with Drizzle ORM
- **Shared Kernel**: Common utilities and configurations

## 🔄 Migration from FastifyV2

This application is a direct migration from the FastifyV2 project, preserving 100% of the original functionality while adopting NestJS patterns and structure.

Key changes:
- Controllers instead of route handlers
- Dependency injection for services
- Modules for organization
- Decorators for metadata
- Fastify adapter for performance

## 📦 Recent Updates

- **NestJS**: Upgraded to v11.x with latest features and performance improvements
- **Drizzle ORM**: Updated to v0.45+ with enhanced query capabilities
- **TypeScript**: Migrated to v6.x with improved type checking and deprecation handling
- **Zod**: Upgraded to v4.x with better validation performance
- **Development Tools**: Replaced ESLint/Prettier with oxlint/oxfmt for 10x faster linting and formatting
- **Dependencies**: All packages updated to latest stable versions

## 📊 Database Schema

Same as FastifyV2:
- **users**: id, email, passwordHash, name, role, timestamps
- **products**: id, name, description, price, stock, timestamps
- **orders**: id, userId, totalAmount, status, timestamps
- **order_items**: orderId, productId, quantity, priceAtPurchase (composite PK)

## 🛠️ Development

```bash
# Build
npm run build

# Serve
npm run serve

# Test
npm run test

# Lint (oxlint - ultra fast, ~6ms)
npm run lint

# Format (oxfmt - ultra fast, ~3ms)
npm run format

# Database commands
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```