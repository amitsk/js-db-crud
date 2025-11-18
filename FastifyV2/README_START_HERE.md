# FastifyV2 - START HERE 👋

## 🎯 Two Architectures Available

This project includes **TWO complete implementations** of the same API:

### ⚡ Simple Version (Default, Recommended)
- **13 files**, 650 lines
- Direct route handlers
- Minimal boilerplate
- 👉 **[README_SIMPLE.md](README_SIMPLE.md)** ← Start here!

### 🏗️ Complex Version (Enterprise Pattern)
- **35 files**, 2000+ lines
- Controller → Service → Repository
- Full layer separation
- 👉 **[README.md](README.md)** ← Traditional approach

## 📊 Quick Comparison

| Aspect | Simple | Complex |
|--------|--------|---------|
| **Files** | 13 | 35 |
| **Lines** | 650 | 2000+ |
| **Layers** | 1 | 4 |
| **Learning Curve** | Easy | Medium |
| **Best For** | 90% of APIs | Large teams |

## 🚀 Quick Start (Simple Version)

```bash
cd FastifyV2
npm install
createdb fastifyv2
npm run db:push
npm run dev          # ← Uses simple version
```

Visit: `http://localhost:3000`

## 📚 Which Should You Use?

👉 **[WHICH_VERSION.md](WHICH_VERSION.md)** - Decision guide

**Quick answer**: Start with **Simple**. Switch to Complex only if you need it.

## 📖 Documentation

1. **[WHICH_VERSION.md](WHICH_VERSION.md)** - Which architecture to use?
2. **[README_SIMPLE.md](README_SIMPLE.md)** - Simple version guide (recommended)
3. **[README.md](README.md)** - Complex version guide
4. **[ARCHITECTURE_COMPARISON.md](ARCHITECTURE_COMPARISON.md)** - Detailed comparison
5. **[QUICKSTART.md](QUICKSTART.md)** - Quick reference
6. **[CHECKLIST.md](CHECKLIST.md)** - Setup checklist

## 🔄 Switching Versions

Both versions are fully functional and ready to use:

```bash
# Simple (default)
npm run dev              # Uses server.simple.ts
npm run start            # Production with simple

# Complex
npm run dev:complex      # Uses server.ts
npm run start:complex    # Production with complex
```

## ✨ Same Features in Both

- ✅ Full CRUD API (15 endpoints)
- ✅ PostgreSQL + Drizzle ORM
- ✅ TypeScript (strict mode)
- ✅ Zod validation
- ✅ Database transactions
- ✅ Pagination
- ✅ Error handling
- ✅ Security plugins

## 🎓 Learning Path

1. **Read** [WHICH_VERSION.md](WHICH_VERSION.md) (5 min)
2. **Choose** Simple or Complex
3. **Read** the respective README
4. **Run** `npm run dev`
5. **Explore** the code
6. **Customize** for your needs

## 💡 Philosophy

> "Make things as simple as possible, but not simpler."
>
> Start simple. Add complexity when pain points emerge. Not before.

## 🏆 Recommendation

**Use Simple Version** (default) unless you specifically need:
- Large team coordination (5+ developers)
- Isolated unit testing
- Multiple data sources per entity
- Complex business rules requiring separation

## 📦 Project Stats

- **Language**: TypeScript 5.x
- **Framework**: Fastify 5.x
- **Database**: PostgreSQL + Drizzle ORM 0.33+
- **Validation**: Zod 3.x
- **Tables**: 4 (users, products, orders, order_items)
- **Endpoints**: 15 (full CRUD)
- **Architecture**: Your choice!

## 🎯 Quick Reference

```bash
# Install & Setup
npm install
createdb fastifyv2
npm run db:push

# Development
npm run dev              # Simple version (default)
npm run dev:complex      # Complex version

# Database
npm run db:studio        # Open Drizzle Studio GUI
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
```

## 🆘 Need Help?

1. Check [WHICH_VERSION.md](WHICH_VERSION.md) for architecture decision
2. Read [README_SIMPLE.md](README_SIMPLE.md) for simple version
3. Read [README.md](README.md) for complex version
4. Review [ARCHITECTURE_COMPARISON.md](ARCHITECTURE_COMPARISON.md) for details

---

**Ready? Pick a version and dive in! 🚀**

Recommended: **[README_SIMPLE.md](README_SIMPLE.md)** ⚡
