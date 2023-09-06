import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { CartController } from '../controllers/index.js';

const router = express.Router();

router.get('/', checkAuth, CartController.getAll);

router.post('/', checkAuth, CartController.create);

router.delete('/:id', checkAuth, CartController.remove);

export default router;
