import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { OrderController } from '../controllers/index.js';
import { orderValidator } from '../validations.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/', checkAuth, orderValidator, handleValidationErrors, OrderController.create);

export default router;
