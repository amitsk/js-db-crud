# Instructions and Summary

## Project Overview

This is a Fastify-based CRUD API for managing users, products, and orders. It uses Drizzle ORM for database operations, Zod for schema validation, and follows Fastify's modular design best practices.

## Technologies Used

- **Fastify 5.x**: Web framework
- **Drizzle ORM**: Database ORM for PostgreSQL
- **Zod**: Schema validation
- **@fastify/cors**: CORS handling
- **Biome**: Code linting and formatting
- **dotenv**: Environment variable management

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd Fastify
   npm install
   ```

2. **Configure Database**:
   - Update `.env.local` with your PostgreSQL connection string:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/dbname
     ```

3. **Database Setup**:
   ```bash
   npm run db:generate  # Generate migrations
   npm run db:migrate   # Apply migrations
   ```

4. **Code Quality**:
   ```bash
   npm run format  # Format code
   npm run lint    # Lint code
   npm run check   # Full check
   ```

5. **Run the Application**:
   ```bash
   npm run dev  # Development mode with watch
   # or
   npm start    # Production mode
   ```

## API Structure

- **Routes**: Modular routes in `src/routes/` for users, products, and orders
- **Database**: Schema in `src/db/schema.js`, client in `src/db/index.js`
- **Validation**: Zod schemas for request body validation
- **CORS**: Enabled globally for cross-origin requests

## Key Features

- Full CRUD operations for all three entities
- Input validation with Zod
- Relational data fetching for orders (includes user and product details)
- Proper HTTP status codes and error handling
- Modular route registration
- Environment-based configuration

## Database Schema

- **users**: id, name, email, createdAt
- **products**: id, name, price, description, createdAt
- **orders**: id, userId, productId, quantity, createdAt

Relations are defined for orders to users and products.

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- Biome configuration copied from the Tanstack project
- Drizzle config set up for PostgreSQL
- Server listens on port 3000 by default

## Testing the API

Use the curl examples in `README.md` to test all endpoints. Ensure the database is populated with sample data for orders to work properly.