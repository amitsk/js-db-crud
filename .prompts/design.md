# Generate a Scalable Express.js + Handlebars CRUD App (Node.js, ES Modules)

**Goal**: Generate a **complete, production-ready, DRY (Don't Repeat Yourself)** multi-page CRUD web app using:
- **Node.js** (ES modules)
- **Express.js**
- **Handlebars** (`.hbs`) with shared templates
- **PostgreSQL** via `pg`
- **Environment variables** (`.env`)
- **Custom session-based flash messages** (no external dependencies)
- **Bootstrap 5** (CDN)

---

## Requirements

1. **Zero duplication** for CRUD operations across entities (`users`, `products`, `orders`)
2. **Generic CRUD controller factory** (Create, Read, Update, Delete, List, Show)
3. **Shared Handlebars templates** (`list.hbs`, `form.hbs`, `show.hbs`)
4. **Auto-mount all routes** from `./routes/` folder
5. **Async handler wrapper** (no try/catch in routes)
6. **Central model registry** (`models/index.js`)
7. **Error handling middleware**
8. **Custom flash messages via session** (no external flash middleware)
9. **Method override** for PUT/DELETE
10. **Responsive navbar + Bootstrap**

---

## Routes

For each entity (`users`, `products`, `orders`):
- `GET /entity` - List all records
- `GET /entity/new` - Show create form
- `POST /entity` - Create new record
- `GET /entity/:id` - Show individual record
- `GET /entity/:id/edit` - Show edit form
- `PUT /entity/:id` - Update record
- `DELETE /entity/:id` - Delete record

---

## Folder Structure
- Use standard best practices

---

## Details

- Use **ES modules** (`import`/`export`)
- `package.json` scripts: `"start": "node server.js"`, `"dev": "nodemon server.js"`
- Dependencies: `express`, `express-handlebars`, `pg`, `dotenv`, `express-session`, `method-override`
- Dev: `nodemon`
- DB pool in `config/db.js` using `.env`
- Handlebars helpers: `capitalize`, `obj`
- Templates: `list.hbs` (with View/Edit/Delete actions), `form.hbs` (create/edit), `show.hbs` (read-only view)
- Custom flash message system using Express session (no external flash middleware)
- Adding new entity = 1 model + 1 controller line
- All views use `{{> shared/list}}`, `{{> shared/form}}`, and `{{> shared/show}}`

---

## Output

Generate **all files** with correct imports, exports, and logic.
Include full CRUD operations: **Create, Read (List + Show), Update, Delete**.
Implement custom session-based flash messages for user feedback.
Make it **ready to run** with `npm install && npm run dev`.

**Start generating now.**