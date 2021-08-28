describe('Barn Raiser Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should display the correct page upon load', () => {
    cy.get('h1').contains('BarnRaiser').should('be.visible');
    cy.get('.need-container').should('be.visible');
  });

  // it('should allow the user to switch to a view of a form to submit their own request');
  //
  // it('should display a list of cards corresponding to requests for help');
  //
  // it('should show the correct bits of data on each request card');
});
