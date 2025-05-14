import products from '../data/data.json';
import request from 'supertest';
import express from 'express';
import productRouter from './products';

// Setup express
const app = express();
app.use(express.json());
app.use('/api/products', productRouter);

describe('Products API Endpoints', () => {
  it('should return all products', async () => {
    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it('should return a specific product when valid ID is provided', async () => {
    const response = await request(app).get('/api/products/BBS001');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(products.products.data.items[0]);
  });

  it('should return undefined when product with ID does not exist', async () => {
    const response = await request(app).get('/api/products/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });
});
