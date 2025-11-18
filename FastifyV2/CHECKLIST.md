# FastifyV2 - Setup Checklist ✓

Use this checklist to get your FastifyV2 API up and running!

## Pre-requisites ✅

- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL 14+ installed (`psql --version`)
- [ ] PostgreSQL server running
- [ ] npm or yarn installed

## Setup Steps 🚀

### 1. Install Dependencies
```bash
cd FastifyV2
npm install
```
- [ ] Dependencies installed successfully
- [ ] No errors in `package-lock.json`

### 2. Database Setup
```bash
# Create database
createdb fastifyv2

# Or using psql
psql -U postgres
CREATE DATABASE fastifyv2;
\q
```
- [ ] Database `fastifyv2` created
- [ ] Database accessible

### 3. Environment Configuration
- [ ] Review `.env.local` file
- [ ] Update `DATABASE_URL` if needed (username, password, database name)
- [ ] Verify `PORT` (default: 3000)
- [ ] Set `NODE_ENV` to `development`

### 4. Database Schema
Choose one option:

**Option A: Push Schema (Quick, for development)**
```bash
npm run db:push
```
- [ ] Schema pushed successfully
- [ ] Tables created in database

**Option B: Generate Migrations (Recommended for production)**
```bash
npm run db:generate
npm run db:migrate
```
- [ ] Migration files generated in `src/db/migrations/`
- [ ] Migrations applied successfully

### 5. Verify Database
```bash
# Check tables exist
psql -d fastifyv2 -c "\dt"
```
Expected tables:
- [ ] `users`
- [ ] `products`
- [ ] `orders`
- [ ] `order_items`

### 6. Start Development Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Log shows: "FastifyV2 Server Running"
- [ ] Listening on `http://0.0.0.0:3000`

### 7. Test API

**Health Check**
```bash
curl http://localhost:3000/
```
- [ ] Returns JSON with `status: "ok"`

**Create a User**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234","name":"Test User"}'
```
- [ ] Returns user object with ID
- [ ] Status code 201

**List Users**
```bash
curl http://localhost:3000/api/users
```
- [ ] Returns array with created user

**Create a Product**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":"99.99","stock":10}'
```
- [ ] Returns product object with ID
- [ ] Status code 201

**Create an Order**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"items":[{"productId":1,"quantity":2}]}'
```
- [ ] Returns order with items
- [ ] Status code 201
- [ ] Product stock decreased in database

## Optional Setup 🎯

### Drizzle Studio (Database GUI)
```bash
npm run db:studio
```
- [ ] Opens in browser
- [ ] Can view all tables
- [ ] Can edit data

### TypeScript Compilation
```bash
npm run build
```
- [ ] Compiles successfully
- [ ] `dist/` folder created
- [ ] No TypeScript errors

### Production Start
```bash
NODE_ENV=production npm run start
```
- [ ] Runs from compiled JS
- [ ] Structured JSON logs

## Troubleshooting 🔧

### Database Connection Issues
- [ ] Check PostgreSQL is running: `pg_isready`
- [ ] Verify DATABASE_URL format: `postgresql://user:pass@host:port/dbname`
- [ ] Test connection: `psql $DATABASE_URL`

### Port Already in Use
- [ ] Change `PORT` in `.env.local`
- [ ] Or kill process: `lsof -ti:3000 | xargs kill`

### TypeScript Errors
- [ ] Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- [ ] Verify `tsconfig.json` is correct

### Migration Issues
- [ ] Delete migrations: `rm -rf src/db/migrations/*`
- [ ] Regenerate: `npm run db:generate`
- [ ] Or use push: `npm run db:push`

## Next Steps 📚

After successful setup:

1. **Read Documentation**
   - [ ] [README.md](README.md) - Full API documentation
   - [ ] [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Architecture details
   - [ ] [QUICKSTART.md](QUICKSTART.md) - Quick reference

2. **Explore Code**
   - [ ] Review [src/modules/user/](src/modules/user/) for module structure
   - [ ] Check [src/db/schema/](src/db/schema/) for table definitions
   - [ ] Study [src/modules/order/order.service.ts](src/modules/order/order.service.ts:31) for transaction example

3. **Customize**
   - [ ] Add your own modules
   - [ ] Implement JWT authentication (see [src/shared/plugins/auth.plugin.ts](src/shared/plugins/auth.plugin.ts:1))
   - [ ] Add password hashing (bcrypt/argon2)
   - [ ] Add tests

4. **Deploy**
   - [ ] Set up Docker
   - [ ] Configure CI/CD
   - [ ] Set production environment variables
   - [ ] Add monitoring

## Verification Summary ✓

If all checks pass:
- ✅ FastifyV2 is running
- ✅ Database is connected
- ✅ All endpoints are working
- ✅ Transactions are functioning
- ✅ Ready for development!

---

**Need help?** Check the [README.md](README.md) for detailed API documentation.

**Happy coding! 🎉**
