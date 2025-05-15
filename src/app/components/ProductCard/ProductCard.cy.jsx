import React from 'react';
import ProductCard from './ProductCard';

describe('<ProductCard />', () => {
  it('should render product card', () => {
    cy.mount(
      <ProductCard
        id="123"
        name="Chicken Nuggets"
        price="10.00"
        reviewCount={'10'}
        rating={'3.5'}
      />
    );

    cy.contains('Chicken Nuggets');
    cy.contains('10.00');
    cy.contains('10 reviews');

    // Assert 3 full stars
    cy.get('[data-cy="starFull"]').should('have.length', 3);

    // Assert 1 half star
    cy.get('[data-cy="starHalf"]').should('have.length', 1);

    // Assert 1 empty star
    cy.get('[data-cy="starEmpty"]').should('have.length', 1);
  });
});
