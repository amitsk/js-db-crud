# FastifyV2 - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd FastifyV2
npm install
```

### 2. Setup Database
Make sure PostgreSQL is running, then create a database:
```bash
createdb fastifyv2
```

Or using psql:
```sql
CREATE DATABASE fastifyv2;
```

### 3. Configure Environment
The `.env.local` file is already created. Update the DATABASE_URL if needed:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastifyv2
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
```

### 4. Generate and Run Migrations
```bash
npm run db:generate
npm run db:migrate
```

Or for quick development (push schema without migrations):
```bash
npm run db:push
```

### 5. Start the Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🧪 Test the API

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": "1299.99",
    "stock": 10
  }'
```

### Create an Order (with multiple items)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {"productId": 1, "quantity": 2}
    ]
  }'
```

### List All Orders
```bash
curl http://localhost:3000/api/orders
```

---

## 📊 Database GUI

Open Drizzle Studio to browse your data:
```bash
npm run db:studio
```

Visit: `http://localhost:4983` (or the port shown in terminal)

---

## 🎯 Next Steps

1. Review the full API documentation in [README.md](README.md)
2. Explore the modular code structure
3. Implement JWT authentication (see `src/shared/plugins/auth.plugin.ts`)
4. Add tests
5. Customize for your use case

---

**Happy coding! 🎉**
