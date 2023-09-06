import express from 'express';
import { BookController } from '../controllers/index.js';
import checkAuth from '../middleware/checkAuth.js';
import checkAdmin from '../middleware/checkAdmin.js';
import { addBookValidator } from '../validations.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.get('/', BookController.getAll);

router.get('/:id', BookController.getOne);

router.post(
  '/',
  checkAuth,
  checkAdmin,
  addBookValidator,
  handleValidationErrors,
  BookController.create,
);

router.patch(
  '/:id',
  checkAuth,
  checkAdmin,
  addBookValidator,
  handleValidationErrors,
  BookController.update,
);

router.delete('/:id', checkAuth, checkAdmin, BookController.remove);

export default router;
