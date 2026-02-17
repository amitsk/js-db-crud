import express from 'express';
import { controllers } from '../controllers/index.js';

const router = express.Router();
const productController = controllers.product;

// List all products
router.get('/', productController.list);

// Show form for new product
router.get('/new', productController.showForm);

// Create new product
router.post('/', productController.create);

// Show individual product
router.get('/:id', productController.show);

// Show form for editing product
router.get('/:id/edit', productController.showForm);

// Update product
router.put('/:id', productController.update);

// Delete product
router.delete('/:id', productController.delete);

export default router;