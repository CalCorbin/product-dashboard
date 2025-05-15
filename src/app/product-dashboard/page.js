import React from 'react';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel.jsx';

export default function ProductDashboard() {
  return (
    <div>
      <h1
        style={{
          padding: '1rem',
        }}
      >
        Product Dashboard
      </h1>
      <ProductCarousel
        title="Most Reviewed"
        queryParams={{ limit: 10, mostReviewed: true }}
      />
      <ProductCarousel
        title="Best Rated"
        queryParams={{ limit: 10, bestRated: true }}
      />
    </div>
  );
}
