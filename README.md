# Scalable Express.js + Handlebars CRUD App

A production-ready, DRY (Don't Repeat Yourself) multi-page CRUD web application built with Node.js, Express.js, Handlebars, and MySQL.

## Features

- **Zero duplication** for CRUD operations across entities (users, products, orders)
- **Generic CRUD controller factory** for easy extension
- **Shared Handlebars templates** for consistent UI
- **Auto-mounting routes** from the `./routes/` folder
- **Async handler wrapper** to avoid try/catch in routes
- **Central model registry** for easy management
- **Error handling middleware**
- **Session-based flash messages**
- **Method override** for PUT/DELETE
- **Responsive Bootstrap 5 UI**

## Prerequisites

- Node.js (ES modules support)
- PostgreSQL database

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and update `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=crud_app
   DB_PORT=3306
   SESSION_SECRET=your-secret-key-here
   ```

4. Create the database tables:
   ```sql
   CREATE DATABASE crud_app;

   \c crud_app;

   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     description TEXT
   );

   CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id),
     product_id INTEGER NOT NULL REFERENCES products(id),
     quantity INTEGER NOT NULL
   );
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── config/
│   └── db.js              # Database connection pool
├── controllers/
│   └── index.js           # Generic CRUD controller factory
├── helpers/
│   └── handlebars.js      # Handlebars helpers
├── middleware/
│   ├── asyncHandler.js    # Async error wrapper
│   └── errorHandler.js    # Error handling middleware
├── models/
│   ├── index.js           # Model registry
│   ├── User.js            # User model
│   ├── Product.js         # Product model
│   └── Order.js           # Order model
├── routes/
│   ├── users.js           # User routes
│   ├── products.js        # Product routes
│   └── orders.js          # Order routes
├── views/
│   ├── layouts/
│   │   └── main.hbs       # Main layout
│   ├── partials/
│   │   ├── navbar.hbs     # Navigation bar
│   │   ├── flash.hbs      # Flash messages
│   │   └── shared/
│   │       ├── list.hbs   # Generic list template
│   │       └── form.hbs   # Generic form template
│   ├── home.hbs           # Home page
│   ├── error.hbs          # Error page
│   ├── users/
│   │   ├── list.hbs       # Users list (uses shared/list)
│   │   └── form.hbs       # User form (uses shared/form)
│   ├── products/
│   │   ├── list.hbs       # Products list
│   │   └── form.hbs       # Product form
│   └── orders/
│       ├── list.hbs       # Orders list
│       └── form.hbs       # Order form
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Main application file
└── README.md              # This file
```

## Adding New Entities

To add a new entity (e.g., `categories`):

1. Create a model in `models/Category.js`
2. Add it to `models/index.js`
3. Create routes in `routes/categories.js`
4. Create view directories `views/categories/` with `list.hbs` and `form.hbs` (using shared partials)

The controller will be automatically created by the factory!

## Technologies Used

- **Node.js** with ES modules
- **Express.js** web framework
- **Handlebars** templating engine
- **pg** (node-postgres) database driver
- **Bootstrap 5** CSS framework
- **express-session** for session management
- **method-override** for HTTP method support