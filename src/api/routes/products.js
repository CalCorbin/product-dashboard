import express from 'express';
import products from '../data/dev-data.json' with { type: 'json' };

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  let result = [...products.products.data.items];

  // Handle sorting based on query parameters
  if (req.query.mostReviewed === 'true' && req.query.bestRated === 'true') {
    // Combined sorting logic - first by rating, then by reviews as a tiebreaker
    result.sort((a, b) => {
      // First compare by rating
      const ratingDiff = b.Rating - a.Rating;

      // If ratings are equal, compare by number of reviews
      return ratingDiff !== 0
        ? ratingDiff
        : b.totalreviews.length - a.totalreviews.length;
    });
  } else if (req.query.mostReviewed === 'true') {
    // Sort by most reviewed only
    result.sort((a, b) => b.totalreviews.length - a.totalreviews.length);
  } else if (req.query.bestRated === 'true') {
    // Sort by best rated only
    result.sort((a, b) => b.Rating - a.Rating);
  }

  // Limit results
  if (req.query.limit && !isNaN(parseInt(req.query.limit))) {
    const limit = parseInt(req.query.limit);
    result = result.slice(0, limit);
  }

  res.status(200).json(result);
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
