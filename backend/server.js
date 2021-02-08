import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';

// ===========================
// MIDDLEWARE
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressJWT from 'express-jwt';

// ===========================
// ROUTES
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

dotenv.config();
connectDB();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('The server is working.');
  });
}

app.use(function (err, req, res, next) {
  console.error(err.stack.yellow);
  res.status(500).send({ message: 'There was an error in the server' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Succes: Server running on port ${PORT}`.magenta.underline);
});
