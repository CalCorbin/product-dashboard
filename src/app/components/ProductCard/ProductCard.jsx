import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, name, price, reviewCount, rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className={styles.productCard}
      tabIndex={0}
      role="article"
      aria-label={`${name}, ${price}, rated ${rating} out of 5`}
      id={`product-${id}`}
    >
      <div className={styles.productImageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={'https://picsum.photos/200'}
          alt={`Product: ${name}`}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>Price: {price}</p>

        <div
          className={styles.productRating}
          aria-label={`Rated ${rating} out of 5 stars`}
        >
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < fullStars
                    ? styles.starFull
                    : i === fullStars && hasHalfStar
                      ? styles.starHalf
                      : styles.starEmpty
                }
                aria-hidden="true"
                data-cy={
                  i < fullStars
                    ? 'starFull'
                    : i === fullStars && hasHalfStar
                      ? 'starHalf'
                      : 'starEmpty'
                }
              >
                {i < fullStars
                  ? '★'
                  : i === fullStars && hasHalfStar
                    ? '☆'
                    : '☆'}
              </span>
            ))}
          </div>
          <span className={styles.reviewCount}>({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
