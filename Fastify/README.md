# Fastify CRUD API

A Fastify-based API for performing CRUD operations on users, products, and orders using Drizzle ORM and PostgreSQL.

## Features

- **Fastify 5.x**: Latest version of Fastify for high performance
- **Drizzle ORM**: Type-safe database operations
- **Zod Validation**: Schema validation for request bodies
- **CORS Support**: Enabled with @fastify/cors
- **Modular Design**: Routes separated into modules
- **Biome Linting**: Code formatting and linting

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your database credentials in `.env.local`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

3. Generate and run database migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`.

## API Endpoints

### Users

- **GET /users**: List all users
- **GET /users/:id**: Get a specific user
- **POST /users**: Create a new user
- **PUT /users/:id**: Update a user
- **DELETE /users/:id**: Delete a user

### Products

- **GET /products**: List all products
- **GET /products/:id**: Get a specific product
- **POST /products**: Create a new product
- **PUT /products/:id**: Update a product
- **DELETE /products/:id**: Delete a product

### Orders

- **GET /orders**: List all orders (with user and product details)
- **GET /orders/:id**: Get a specific order
- **POST /orders**: Create a new order
- **PUT /orders/:id**: Update an order
- **DELETE /orders/:id**: Delete an order

## Curl Examples

### Users

Create a user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

Get all users:
```bash
curl http://localhost:3000/users
```

Get a specific user:
```bash
curl http://localhost:3000/users/1
```

Update a user:
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

Delete a user:
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Products

Create a product:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": "999.99", "description": "A powerful laptop"}'
```

Get all products:
```bash
curl http://localhost:3000/products
```

Get a specific product:
```bash
curl http://localhost:3000/products/1
```

Update a product:
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Laptop", "price": "1199.99"}'
```

Delete a product:
```bash
curl -X DELETE http://localhost:3000/products/1
```

### Orders

Create an order:
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "productId": 1, "quantity": 2}'
```

Get all orders:
```bash
curl http://localhost:3000/orders
```

Get a specific order:
```bash
curl http://localhost:3000/orders/1
```

Update an order:
```bash
curl -X PUT http://localhost:3000/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```

Delete an order:
```bash
curl -X DELETE http://localhost:3000/orders/1
```

## Scripts

- `npm start`: Start the server in production mode
- `npm run dev`: Start the server with watch mode
- `npm run format`: Format code with Biome
- `npm run lint`: Lint code with Biome
- `npm run check`: Check code with Biome
- `npm run db:generate`: Generate Drizzle migrations
- `npm run db:migrate`: Run Drizzle migrations
- `npm run db:push`: Push schema to database
- `npm run db:studio`: Open Drizzle Studio

## Project Structure

```
Fastify/
├── src/
│   ├── db/
│   │   ├── index.js
│   │   └── schema.js
│   └── routes/
│       ├── users.js
│       ├── products.js
│       └── orders.js
├── drizzle/
├── .env.local
├── biome.json
├── drizzle.config.js
├── package.json
├── README.md
└── server.js
```

## Notes

- Ensure your PostgreSQL database is running and accessible via the `DATABASE_URL`.
- The API uses Zod for input validation on POST and PUT requests.
- Orders include joined user and product information in GET responses.
- CORS is enabled for all origins.