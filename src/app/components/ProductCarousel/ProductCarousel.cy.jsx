import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductCarousel from './ProductCarousel';
import products from '../../../api/data/dev-data.json';

describe('<ProductCarousel />', () => {
  const queryClient = new QueryClient();
  const prepareComponent = () => {
    cy.viewport(1280, 720);
    cy.intercept('GET', '/api/products?mostReviewed=true&limit=10', [
      ...products.products.data.items,
    ]);
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ProductCarousel
          title="Most Reviewed"
          queryParams={{ limit: 10, mostReviewed: true }}
        />
      </QueryClientProvider>
    );
  };

  it('should render product carousel', () => {
    prepareComponent();
    cy.contains('Most Reviewed').should('be.visible');
    cy.contains('Lycos Corn Flakes').should('be.visible');
    cy.contains('Locos Energy Bar').should('be.visible');
    cy.contains('Jim Jam Magic Wand').should('be.visible');
    cy.contains("Jimmy's Sour Jelly Beans").should('be.visible');
  });

  it('should render loading state', () => {
    cy.intercept('GET', '/api/products').as('productQuery');

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ProductCarousel title="Most Reviewed" />
      </QueryClientProvider>
    );

    cy.contains('Loading...').should('be.visible');
  });

  it('should render error state', () => {
    cy.intercept('GET', '/api/products', { statusCode: 500 }).as(
      'productQuery'
    );

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ProductCarousel title="Most Reviewed" />
      </QueryClientProvider>
    );

    cy.contains('Failed to Load Products', {
      timeout: 10000,
    }).should('be.visible');
    cy.contains('Failed to fetch products').should('be.visible');
  });
});
