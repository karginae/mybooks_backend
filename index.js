import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import createHttpError from 'http-errors';

import { UserController } from './controllers/index.js';
import bookRoutes from './routes/Book.js';
import cartRoutes from './routes/Cart.js';
import favoriteRoutes from './routes/Favorite.js';
import orderRoutes from './routes/Order.js';
import roleRoutes from './routes/Role.js';
import { regValidator, authValidator } from './validations.js';
import upload from './utils/uploadCover.js';
import checkAuth from './middleware/checkAuth.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Сonnected to database'))
  .catch((error) => console.log(error));

const app = express();

const rfsStream = rfs.createStream(process.env.LOG_FILE || 'log.txt', {
  size: process.env.LOG_SIZE || '10M',
  interval: process.env.LOG_INTERVAL || '1d',
  compress: 'gzip',
});

app.use(
  morgan(process.env.LOG_FORMAT || 'dev', {
    stream: process.env.LOG_FILE ? rfsStream : process.stdout,
  }),
);

if (process.env.LOG_FILE) {
  app.use(morgan(process.env.LOG_FORMAT || 'dev'));
}

app.use(express.json());
app.use(cors());

app.use('/covers', express.static('covers'));

app.post('/covers', upload.single('image'), (req, res) => {
  res.json({
    url: `/covers/${req.file.originalname}`,
  });
});

app.post('/auth', authValidator, handleValidationErrors, UserController.auth);

app.post('/reg', regValidator, handleValidationErrors, UserController.registration);

app.get('/me', checkAuth, UserController.getMe);

app.use('/roles', roleRoutes);
app.use('/books', bookRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/order', orderRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log('Server is running');
});
