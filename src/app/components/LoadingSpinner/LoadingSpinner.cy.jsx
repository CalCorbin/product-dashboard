import React from 'react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
  it('should render loading spinner', () => {
    cy.mount(<LoadingSpinner />);
    cy.contains('Loading...');
  });
});
