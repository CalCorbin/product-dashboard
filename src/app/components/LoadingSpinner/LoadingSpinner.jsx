'use client';
import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  const sizeClass = styles.medium;

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${sizeClass}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
