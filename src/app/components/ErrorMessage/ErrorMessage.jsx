import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <svg
          className={styles.errorIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div className={styles.errorMessage}>
          <h3>Failed to Load Products</h3>
          <p>{error.message}</p>
        </div>
      </div>
      <button
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
