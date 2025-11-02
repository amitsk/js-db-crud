import express from 'express';
import { controllers } from '../controllers/index.js';

const router = express.Router();
const userController = controllers.user;

// List all users
router.get('/', userController.list);

// Show form for new user
router.get('/new', userController.showForm);

// Create new user
router.post('/', userController.create);

// Show individual user
router.get('/:id', userController.show);

// Show form for editing user
router.get('/:id/edit', userController.showForm);

// Update user
router.put('/:id', userController.update);

// Delete user
router.delete('/:id', userController.delete);

export default router;