'use client';
import React, { useState } from 'react';
import useGetAllProducts from '../../hooks/useGetAllProducts';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '@/app/components/LoadingSpinner/LoadingSpinner.jsx';
import styles from './ProductCarousel.module.css';
import ErrorMessage from '@/app/components/ErrorMessage/ErrorMessage.jsx';

const ProductCarousel = ({ title, queryParams = {} }) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProducts(queryParams);

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 4;

  const nextItem = () => {
    if (products && currentIndex < products.length - productsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   * Function for calculating the translation value for css based on current index.
   * This helps ensure a smooth transition when navigating the carousel.
   * @returns {`translateX(-${number}%)`}
   */
  const getTranslateValue = () => {
    const itemWidth = 100 / productsPerView;
    return `translateX(-${currentIndex * itemWidth}%)`;
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>{title}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={styles.carouselControls}>
            <button
              onClick={prevItem}
              className={styles.navButton}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <div className={styles.carouselWindow}>
              <div
                className={styles.carouselTrack}
                style={{ transform: getTranslateValue() }}
              >
                {products.map((product) => (
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
            </div>
            <button
              onClick={nextItem}
              className={styles.navButton}
              disabled={currentIndex >= products.length - productsPerView}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
