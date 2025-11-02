import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

import './helpers/handlebars.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Simple flash messages middleware
app.use((req, res, next) => {
  res.locals.messages = req.session.messages || {};
  req.session.messages = {};

  // Simple flash function
  req.flash = (type, message) => {
    if (message) {
      req.session.messages[type] = req.session.messages[type] || [];
      req.session.messages[type].push(message);
    }
  };

  next();
});

// Handlebars setup
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Auto-mount routes
const routesPath = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));

for (const file of routeFiles) {
  const routeName = file.replace('.js', '');
  const routeModule = await import(`./routes/${file}`);
  app.use(`/${routeName}`, routeModule.default);
}

// Root route
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { title: '404', message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});