describe('Barn Raiser Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should display the correct page upon load', () => {
    cy.get('h1').contains('BarnRaiser').should('be.visible');
    cy.get('h2').contains('Are You Looking for Assistance?').should('be.visible');
    cy.get('button').contains('I Need Help').should('be.visible');
    cy.get('h3').contains('Can You Offer Assistance?').should('be.visible');
    cy.get('button').contains('Give Help').should('be.visible');
  });

  it('should allow the user to switch to a view of a form to submit their own request for help', () => {

  });

  it('should allow the user to switch to a page to view all requests for help', () => {

  });
});
