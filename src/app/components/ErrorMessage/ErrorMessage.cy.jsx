import React from 'react';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders an error message', () => {
    cy.mount(<ErrorMessage error={{ message: 'fetch failed' }} />);
    cy.contains('Failed to Load Products');
    cy.contains('fetch failed');
  });
});
