import express from 'express';
import products from '../data/dev-data.json' with { type: 'json' };

const router = express.Router();

// Get all products
router.get('/', (_, res) => {
  res.status(200).json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;

  const product = products.products.data.items.find(
    ({ id }) => id === productId
  );

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
