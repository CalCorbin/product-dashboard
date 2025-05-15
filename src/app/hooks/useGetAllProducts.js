import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch all products with optional filtering
 * @param {Object} options - Query options
 * @param {boolean} options.mostReviewed - Sort by most reviewed products
 * @param {boolean} options.bestRated - Sort by best rated products
 * @param {number} options.limit - Limit the number of products returned
 * @param {Object} queryOptions - Additional react-query options
 * @returns {Object} Query result object
 */
function useGetAllProducts(options = {}, queryOptions = {}) {
  const { mostReviewed, bestRated, limit } = options;

  return useQuery({
    queryKey: ['products', { mostReviewed, bestRated, limit }],
    queryFn: async () => {
      // Build the query string based on provided options
      const params = new URLSearchParams();

      if (mostReviewed) {
        params.append('mostReviewed', 'true');
      }

      if (bestRated) {
        params.append('bestRated', 'true');
      }

      if (limit) {
        params.append('limit', limit.toString());
      }

      const queryString = params.toString();
      const url = `http://localhost:3000/api/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
    ...queryOptions,
  });
}

export default useGetAllProducts;
