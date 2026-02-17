# FastifyV2 - Simple Architecture (Recommended)

A clean, minimal Fastify + Drizzle ORM API with **67% less code** than traditional layered architecture.

## 🎯 Philosophy

**Keep it simple.** Most CRUD APIs don't need controllers, services, and repositories. Put everything in route handlers until complexity demands separation.

## 📊 Stats

- **Total Files**: 13 (vs 35 in complex version)
- **Total Lines**: ~650 (vs ~2000 in complex version)
- **Modules**: 3 (User, Product, Order)
- **Architecture**: Route Handlers → Database
- **Same Features**: Full CRUD, Transactions, Validation, Pagination

## 🗂️ Simple Structure

```
FastifyV2/
├── src/
│   ├── server.simple.ts              # Main server (60 lines)
│   ├── app.simple.ts                 # Route registration (20 lines)
│   ├── config/index.ts               # Env validation
│   ├── db/
│   │   ├── index.ts                  # Database connection
│   │   └── schema/                   # 4 table schemas
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.routes.simple.ts    (110 lines - all logic)
│   │   │   └── user.schema.ts           (40 lines - validation)
│   │   ├── product/
│   │   │   ├── product.routes.simple.ts (80 lines)
│   │   │   └── product.schema.ts        (40 lines)
│   │   └── order/
│   │       ├── order.routes.simple.ts   (180 lines - with transactions)
│   │       └── order.schema.ts          (40 lines)
│   └── types/index.d.ts
├── package.json
├── tsconfig.json
└── drizzle.config.ts
```

## 🚀 Quick Start

```bash
cd FastifyV2
npm install
createdb fastifyv2
npm run db:push
npm run dev                # Uses simple version by default
```

Visit: `http://localhost:3000`

## 📡 API Endpoints (Same as Complex Version)

### Users (`/api/users`)
- `GET /api/users` - List with pagination
- `GET /api/users/:id` - Get by ID
- `POST /api/users` - Create
- `PUT /api/users/:id` - Update
- `DELETE /api/users/:id` - Delete

### Products (`/api/products`)
- `GET /api/products` - List with pagination
- `GET /api/products/:id` - Get by ID
- `POST /api/products` - Create
- `PUT /api/products/:id` - Update
- `DELETE /api/products/:id` - Delete

### Orders (`/api/orders`)
- `GET /api/orders` - List with filters (userId, status)
- `GET /api/orders/:id` - Get with items
- `POST /api/orders` - Create with items (atomic transaction)
- `PUT /api/orders/:id` - Update status
- `DELETE /api/orders/:id` - Delete (cascade)

## 💡 Code Example

### Simple Version (110 lines in 1 file)

```typescript
// user.routes.simple.ts - Everything in one place
export async function userRoutes(fastify: FastifyInstance) {
  // GET /api/users
  fastify.get('/', { schema: { querystring: listUsersQuerySchema } },
    async (request) => {
      const { limit, offset } = request.query as any;
      const users = await fastify.db.select().from(users).limit(limit).offset(offset);
      return users.map(({ passwordHash, ...user }) => user);
    }
  );

  // POST /api/users
  fastify.post('/', { schema: { body: createUserSchema } },
    async (request, reply) => {
      const body = request.body as any;

      // Check email exists
      const [existing] = await fastify.db.select().from(users)
        .where(eq(users.email, body.email)).limit(1);
      if (existing) throw createError(400, 'Email already exists');

      // Create user
      const [newUser] = await fastify.db.insert(users).values({
        email: body.email,
        passwordHash: `hashed_${body.password}`,
        name: body.name,
        role: body.role || 'customer',
      }).returning();

      const { passwordHash, ...user } = newUser;
      return reply.status(201).send(user);
    }
  );

  // ... other endpoints
}
```

**Benefits:**
- All logic visible in one place
- No jumping between files
- Clear and straightforward
- Easy to understand flow

### vs Complex Version (435 lines across 6 files)

```typescript
// user.routes.ts (150 lines)
fastify.post('/', { schema: { body: createUserSchema } },
  userController.createUser.bind(userController)
);

// user.controller.ts (80 lines)
async createUser(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
  const user = await this.service.createUser(request.body);
  return reply.status(201).send(user);
}

// user.service.ts (100 lines)
async createUser(input: CreateUserInput) {
  const existing = await this.repository.findByEmail(input.email);
  if (existing) throw createError(400, 'Email already exists');

  const newUser = await this.repository.create({
    email: input.email,
    passwordHash: `hashed_${input.password}`,
    name: input.name,
    role: input.role || 'customer',
  });

  const { passwordHash, ...user } = newUser;
  return user;
}

// user.repository.ts (60 lines)
async create(data: NewUser) {
  const result = await this.db.insert(users).values(data).returning();
  return result[0];
}

async findByEmail(email: string) {
  const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}
```

**Drawbacks:**
- Split across 4 files
- Lots of indirection
- Pass-through methods
- More boilerplate

## ✅ What's the Same

Both versions have:
- ✅ Full TypeScript with strict mode
- ✅ Zod validation
- ✅ Database transactions (order creation)
- ✅ Pagination (limit/offset)
- ✅ Error handling
- ✅ Security plugins (cors, helmet, compress)
- ✅ Same API contract
- ✅ Same performance

## 📦 NPM Scripts

```bash
# Simple version (default, recommended)
npm run dev              # Start with hot reload
npm run start            # Production mode

# Complex version (if needed)
npm run dev:complex      # Start complex architecture
npm run start:complex    # Production with complex architecture

# Database
npm run db:push          # Push schema changes
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio
```

## 🔄 When to Switch to Complex

Refactor to complex version when you have:
- ❌ Same logic duplicated across 3+ routes
- ❌ Complex business rules that need testing in isolation
- ❌ Multiple data sources per entity
- ❌ Team size > 3 developers
- ❌ Need for strict layer separation

Until then, **keep it simple!**

## 📈 Comparison

| Aspect | Simple | Complex |
|--------|--------|---------|
| **Files** | 13 | 35 |
| **Lines of Code** | 650 | 2000+ |
| **User Module** | 2 files | 6 files |
| **Readability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Dev Speed** | ⚡ Fast | 🐢 Slow |
| **Testability** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Scalability** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🎓 Key Principles

1. **YAGNI** - You Aren't Gonna Need It
   - Don't add layers until you need them
   - Start simple, refactor when complex

2. **Locality of Behavior**
   - Keep related code together
   - Reduce context switching

3. **Optimize for Reading**
   - Code is read 10x more than written
   - Make the flow obvious

4. **Drizzle is Type-Safe**
   - ORM already provides safety
   - No need for repository abstraction

## 🏆 Recommendation

**Use the simple version** for:
- 90% of CRUD APIs
- Solo/small team projects
- Rapid prototyping
- Straightforward business logic

**Switch to complex** when:
- Code duplication becomes painful
- Testing requires isolation
- Team coordination needs structure

## 📚 Documentation

- [ARCHITECTURE_COMPARISON.md](ARCHITECTURE_COMPARISON.md) - Detailed comparison
- [README.md](README.md) - Full complex version docs
- [QUICKSTART.md](QUICKSTART.md) - Quick reference

## 🧪 Example: Test the API

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234","name":"Test User"}'

# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":"1299.99","stock":10}'

# Create an order (atomic transaction)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"items":[{"productId":1,"quantity":2}]}'
```

## 💬 Philosophy

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

> "Make things as simple as possible, but not simpler." - Albert Einstein

> "The best code is no code at all." - Jeff Atwood

Start simple. Add complexity when pain points emerge. Not before.

---

**Built with ❤️ using Fastify + Drizzle ORM + Common Sense**
