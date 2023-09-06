import express from 'express';
import { RoleController } from '../controllers/index.js';

const router = express.Router();

router.post('/', RoleController.create);

export default router;
