'use client';
import React from 'react';
import useGetAllProducts from '../../hooks/useGetAllProducts';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ title, queryParams = {} }) => {
  const { data: products, isLoading, error } = useGetAllProducts(queryParams);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const productsPerView = 4;

  const nextSlide = () => {
    if (products && currentIndex < products.length - productsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading)
    return <div className={styles.loading}>Loading products...</div>;

  if (error)
    return (
      <div className={styles.error}>
        Error loading products: {error.message}
      </div>
    );

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>{title}</h2>

      <div className={styles.carouselControls}>
        <button
          onClick={prevSlide}
          className={styles.navButton}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>

        <div className={styles.carouselTrack}>
          {products
            .slice(currentIndex, currentIndex + productsPerView)
            .map((product) => (
              <div key={product.id} className={styles.carouselItem}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  rating={product.Rating}
                  reviewCount={product.totalreviews}
                />
              </div>
            ))}
        </div>

        <button
          onClick={nextSlide}
          className={styles.navButton}
          disabled={currentIndex >= products.length - productsPerView}
        >
          &gt;
        </button>
      </div>

      <div className={styles.pagination}>
        {Array.from({
          length: Math.ceil(products.length / productsPerView),
        }).map((_, i) => (
          <button
            key={i}
            className={`${styles.paginationDot} ${currentIndex / productsPerView === i ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(i * productsPerView)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
