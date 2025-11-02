# Generate a Scalable Express.js + Handlebars CRUD App (Node.js, ES Modules)

**Goal**: Generate a **complete, production-ready, DRY (Don't Repeat Yourself)** multi-page CRUD web app using:
- **Node.js** (ES modules)
- **Express.js**
- **Handlebars** (`.hbs`) with shared templates
- **MySQL** via `mysql2/promise`
- **Environment variables** (`.env`)
- **Session-based flash messages**
- **Bootstrap 5** (CDN)

---

## Requirements

1. **Zero duplication** for CRUD operations across entities (`users`, `products`, `orders`)
2. **Generic CRUD controller factory**
3. **Shared Handlebars templates** (`list.hbs`, `form.hbs`)
4. **Auto-mount all routes** from `./routes/` folder
5. **Async handler wrapper** (no try/catch in routes)
6. **Central model registry** (`models/index.js`)
7. **Error handling middleware**
8. **Flash messages via partial**
9. **Method override** for PUT/DELETE
10. **Responsive navbar + Bootstrap**

---

## Folder Structure
- Use standard best practices

---

## Details

- Use **ES modules** (`import`/`export`)
- `package.json` scripts: `"start": "node server.js"`, `"dev": "nodemon server.js"`
- Dependencies: `express`, `express-handlebars`, `mysql2`, `dotenv`, `express-session`, `method-override`
- Dev: `nodemon`
- DB pool in `config/db.js` using `.env`
- Handlebars helpers: `capitalize`, `obj`
- `list.hbs` dynamically reads object keys
- Adding new entity = 1 model + 1 controller line
- All views use `{{> shared/list}}` and `{{> shared/form}}`

---

## Output

Generate **all files** with correct imports, exports, and logic.  
Make it **ready to run** with `npm install && npm run dev`.

**Start generating now.**