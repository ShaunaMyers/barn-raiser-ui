describe('Barn Raiser Error Handling', () => {
  it('should re-route the user back home if they go to a non-existent page', () => {
    cy.visit('http://localhost:3000/garbage_url_test');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('h1').contains('BarnRaiser').should('be.visible');
    cy.get('h2').contains('Are You Looking for Assistance?').should('be.visible');
    cy.get('button').contains('I Need Help').should('be.visible');
    cy.get('h3').contains('Can You Offer Assistance?').should('be.visible');
    cy.get('button').contains('Give Help').should('be.visible');
  });

  it('should notify the user if their help request cannot go through to the server');

  it('should display a message to the user if it cannot fetch help requests from the server');
});
