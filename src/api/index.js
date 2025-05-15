import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRoutes from './routes/products.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to my best performing products backend!' });
});

app.use('/api/products', productsRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
