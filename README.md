# Database Setup Instructions

This repository contains three implementations of a CRUD web application: one using Express.js + Handlebars, one using Fastify + Drizzle ORM, and another using Tanstack Start.

## Prerequisites

- Node.js (ES modules support)
- PostgreSQL database

## Database Setup

1. Install and start PostgreSQL on your system.

2. Create the database:
   ```sql
   CREATE DATABASE crud_app;
   ```

3. Connect to the database:
   ```sql
   \c crud_app;
   ```

4. Create the tables:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id),
     product_id INTEGER NOT NULL REFERENCES products(id),
     quantity INTEGER NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

## Environment Variables

Create a `.env` file in each project folder with the following variables:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=crud_app
DB_PORT=5432
SESSION_SECRET=your-secret-key-here
```

Adjust the values according to your PostgreSQL setup.

## Projects

- [ExpressJs](./ExpressJs/) - Express.js + Handlebars implementation
- [Fastify](./Fastify/) - Fastify + Drizzle ORM implementation
- [Tanstack](./Tanstack/) - Tanstack Start implementation