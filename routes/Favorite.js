import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { FavoriteController } from '../controllers/index.js';

const router = express.Router();

router.get('/', checkAuth, FavoriteController.getAll);

router.post('/', checkAuth, FavoriteController.create);

router.delete('/:id', checkAuth, FavoriteController.remove);

export default router;
