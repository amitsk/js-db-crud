# Which Architecture Should You Use?

## 🎯 TL;DR

**Use the SIMPLE version (default).** It's 67% less code, easier to understand, and perfect for most APIs.

## 🤔 Quick Decision Tree

```
Do you have a team of 5+ developers?
├─ YES → Use Complex
└─ NO ↓

Is your business logic extremely complex?
├─ YES → Use Complex
└─ NO ↓

Do you need to mock database for unit tests?
├─ YES → Use Complex
└─ NO ↓

Is this a standard CRUD API?
├─ YES → Use Simple ✅
└─ NO → Probably use Simple anyway
```

## 📊 Side-by-Side

| Question | Simple | Complex |
|----------|--------|---------|
| **Lines of code** | 650 | 2000+ |
| **Files** | 13 | 35 |
| **Learning curve** | Easy | Medium |
| **Time to add feature** | Fast | Slow |
| **Understand flow** | 1 file | 4 files |
| **Boilerplate** | Minimal | Lots |
| **Testing strategy** | Integration | Unit + Integration |

## ✅ Use Simple When...

1. **You're building a CRUD API** (90% of APIs)
   - Create, Read, Update, Delete operations
   - Straightforward database queries
   - Basic validation

2. **You value simplicity**
   - Want to understand code at a glance
   - Prefer locality of behavior
   - Like minimal abstraction

3. **You're a small team** (1-4 developers)
   - Don't need strict layer separation
   - Can coordinate without structure
   - Move fast, iterate quickly

4. **You're prototyping**
   - Need to validate ideas quickly
   - Requirements change frequently
   - Time to market matters

## ⚙️ Use Complex When...

1. **You have complex business logic**
   - Same logic reused across multiple endpoints
   - Heavy calculations or transformations
   - Rules that need isolated testing

2. **You're a large team** (5+ developers)
   - Need clear boundaries
   - Multiple people working on same module
   - Onboarding new developers regularly

3. **You need unit testing**
   - Test business logic without database
   - Mock repositories for fast tests
   - CI/CD requires quick test suite

4. **You have multiple data sources**
   - Database + cache + external APIs
   - Need to swap implementations
   - Want repository abstraction

## 📈 Migration Path

### Starting with Simple (Recommended)

```typescript
// Day 1: Simple version
fastify.post('/api/users', async (request, reply) => {
  // Validation
  const body = request.body;

  // Business logic
  if (await emailExists(body.email)) {
    throw createError(400, 'Email exists');
  }

  // Database
  const user = await fastify.db.insert(users).values(body).returning();
  return reply.status(201).send(user);
});
```

### When to refactor (6-12 months later)

**Trigger**: Logic duplicated 3+ times

```typescript
// Refactor 1: Extract to function
async function createUser(db, input) {
  if (await emailExists(db, input.email)) {
    throw createError(400, 'Email exists');
  }
  return await db.insert(users).values(input).returning();
}

fastify.post('/api/users', async (request, reply) => {
  const user = await createUser(fastify.db, request.body);
  return reply.status(201).send(user);
});
```

**Trigger**: Need to test business logic in isolation

```typescript
// Refactor 2: Extract to service class
class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(input) {
    if (await this.repository.findByEmail(input.email)) {
      throw createError(400, 'Email exists');
    }
    return await this.repository.create(input);
  }
}
```

## 🎓 Real-World Examples

### Simple Works For:
- Todo app API
- Blog API
- E-commerce product catalog
- User management system
- Content management system
- Most SaaS APIs

### Complex Needed For:
- Banking transaction system (complex rules)
- Insurance policy pricing (heavy calculations)
- Multi-tenant SaaS with different data sources
- Legacy integration with multiple systems
- APIs with 20+ developers

## 💡 Common Mistakes

### ❌ Starting Complex Too Early

```
"Let's use repository pattern for future flexibility!"
→ Spend 3x time writing boilerplate
→ Never need the flexibility
→ Maintenance overhead for no benefit
```

### ❌ Staying Simple Too Long

```
"It's just a bit of duplication..."
→ Same logic in 5 different routes
→ Bug fix requires changing 5 places
→ Inconsistent behavior across endpoints
```

### ✅ The Right Approach

```
1. Start simple
2. Feel the pain points
3. Refactor when pain > effort
4. Not before
```

## 🔄 How to Switch

### Currently Using Simple, Want Complex

```bash
npm run dev:complex   # Uses server.ts
```

The complex version is already there! All files exist.

### Currently Using Complex, Want Simple

```bash
npm run dev          # Uses server.simple.ts (default)
```

The simple version is ready to go.

## 📊 Performance

**Both versions have identical performance.**

- Same database queries
- Same validation
- Same middleware
- Simple has slightly less function call overhead (negligible)

## 🧪 Testing

### Simple Version
```typescript
// Integration test (test through HTTP)
test('create user', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/users',
    payload: { email: 'test@test.com', name: 'Test' }
  });
  expect(response.statusCode).toBe(201);
});
```

### Complex Version
```typescript
// Unit test (test service in isolation)
test('createUser throws on duplicate email', async () => {
  const mockRepo = { findByEmail: () => Promise.resolve({ id: 1 }) };
  const service = new UserService(mockRepo);

  await expect(service.createUser({ email: 'test@test.com' }))
    .rejects.toThrow('Email exists');
});
```

## 🎯 My Recommendation

1. **Start with Simple** (you are here ✅)
2. **Use it for 3-6 months**
3. **Observe pain points**
4. **Refactor specific modules that hurt**
5. **Keep simple modules simple**

Don't refactor everything at once. Mix and match based on need.

## 📚 Further Reading

- [ARCHITECTURE_COMPARISON.md](ARCHITECTURE_COMPARISON.md) - Detailed comparison
- [README_SIMPLE.md](README_SIMPLE.md) - Simple version guide
- [README.md](README.md) - Complex version docs

## 🏆 Bottom Line

**99% of the time, start simple.**

You'll know when you need complex. Until then, enjoy writing less code.

---

**"Premature optimization is the root of all evil." - Donald Knuth**

**"Make it work, make it right, make it fast." - Kent Beck**

**"The best code is no code at all." - Jeff Atwood**
