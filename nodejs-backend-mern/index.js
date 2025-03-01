// require('dotenv').config();
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';
import { urlApi } from './config/db.config.js';

const PORT = process.env.NODE_LOCAL_PORT || 4444;
const MONGO_URI = urlApi || 'mongodb://localhost:27017/testdb';

console.log(urlApi);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log("Database can't connect!", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/api/upload', express.static('uploads'));

app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/api/auth/me', checkAuth, UserController.getMe);

app.post('/api/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/api/upload/${req.file.originalname}`,
  });
});

app.get('/api/tags', PostController.getLastTags);

app.get('/api/posts', PostController.getAll);
app.get('/api/posts/tags', PostController.getLastTags);
app.get('/api/posts/:id', PostController.getOne);

app.post(
  '/api/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
);
app.delete('/api/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/api/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
