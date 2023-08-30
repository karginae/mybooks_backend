import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import { regValidator, authValidator, addBookValidator, orderValidator } from './validations.js';
import checkAuth from './middleware/checkAuth.js';
import checkAdmin from './middleware/checkAdmin.js';
import {
  UserController,
  BookController,
  FavoriteController,
  CartController,
  RoleController,
  OrderController,
} from './controllers/index.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Сonnected to database'))
  .catch((error) => console.log(error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'covers');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/covers', express.static('covers'));

app.post('/covers', upload.single('image'), (req, res) => {
  res.json({
    url: `/covers/${req.file.originalname}`,
  });
});

app.post('/roles', RoleController.create);

app.post('/auth', authValidator, handleValidationErrors, UserController.auth);

app.post('/reg', regValidator, handleValidationErrors, UserController.registration);

app.get('/me', checkAuth, UserController.getMe);

app.post(
  '/books',
  checkAuth,
  checkAdmin,
  addBookValidator,
  handleValidationErrors,
  BookController.create,
);
app.get('/books', BookController.getAll);
app.get('/books/:id', BookController.getOne);
app.patch(
  '/books/:id',
  checkAuth,
  checkAdmin,
  addBookValidator,
  handleValidationErrors,
  BookController.update,
);
app.delete('/books/:id', checkAuth, checkAdmin, BookController.remove);

app.post('/favorites', checkAuth, FavoriteController.create);
app.get('/favorites', checkAuth, FavoriteController.getAll);
app.delete('/favorites/:id', checkAuth, FavoriteController.remove);

app.post('/cart', checkAuth, CartController.create);
app.get('/cart', checkAuth, CartController.getAll);
app.delete('/cart/:id', checkAuth, CartController.remove);

app.post('/order', checkAuth, orderValidator, handleValidationErrors, OrderController.create);

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log('Server is running');
});
