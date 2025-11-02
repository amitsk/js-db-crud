import express from 'express';
import { controllers } from '../controllers/index.js';

const router = express.Router();
const orderController = controllers.order;

// List all orders
router.get('/', orderController.list);

// Show form for new order
router.get('/new', orderController.showForm);

// Create new order
router.post('/', orderController.create);

// Show individual order
router.get('/:id', orderController.show);

// Show form for editing order
router.get('/:id/edit', orderController.showForm);

// Update order
router.put('/:id', orderController.update);

// Delete order
router.delete('/:id', orderController.delete);

export default router;