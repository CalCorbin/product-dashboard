import products from '../data/dev-data.json';
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
    expect(response.body).toEqual([...products.products.data.items]);
  });

  it('should return two products', async () => {
    const reponse = await request(app).get('/api/products?limit=2');

    expect(reponse.status).toBe(200);
    expect(reponse.body.length).toBe(2);
  });

  it('should return all products sorted by most reviews', async () => {
    const response = await request(app).get('/api/products?mostReviewed=true');

    expect(response.status).toBe(200);
    expect(response.body[0].totalreviews).toBe('40');
    expect(response.body[response.body.length - 1].totalreviews).toBe('5');
  });

  it('should return two products sorted by most reviews', async () => {
    const response = await request(app).get(
      '/api/products?mostReviewed=true&limit=2'
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].totalreviews).toBe('40');
    expect(response.body[response.body.length - 1].totalreviews).toBe('35');
  });

  it('should return all products sorted by rating', async () => {
    const response = await request(app).get('/api/products?bestRated=true');

    expect(response.status).toBe(200);
    expect(response.body[0].Rating).toBe('5.0');
    expect(response.body[response.body.length - 1].Rating).toBe('2.0');
  });

  it('should return all products sorted by rating and most reviewed', async () => {
    const response = await request(app)
      .get('/api/products?bestRated=true&mostReviewed=true')
      .expect(200);

    expect(response.status).toBe(200);

    // Verify sorting logic for each adjacent pair of products
    for (let i = 0; i < products.length - 1; i++) {
      const current = products[i];
      const next = products[i + 1];

      if (current.Rating === next.Rating) {
        // If ratings are equal, current product should have more or equal reviews
        expect(current.totalreviews.length).toBeGreaterThanOrEqual(
          next.totalreviews.length
        );
      } else {
        // Current product should have higher or equal rating
        expect(current.Rating).toBeGreaterThanOrEqual(next.Rating);
      }
    }
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
