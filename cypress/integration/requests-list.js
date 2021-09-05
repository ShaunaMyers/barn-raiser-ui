describe('Barn Raiser Request List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Give Help').click();
  });

  it('should allow the user to go back to the home page by clicking on the BarnRaiser logo', () => {
    cy.get('h1').contains('BarnRaiser').click();
    cy.get('h2').contains('Are You Looking for Assistance?').should('be.visible');
    cy.get('button').contains('I Need Help').should('be.visible');
    cy.get('h3').contains('Can You Offer Assistance?').should('be.visible');
    cy.get('button').contains('Give Help').should('be.visible');
  });

  it('should display a list of previously submitted requests', () => {
    cy.get('.all-needs').should('be.visible');
  });

  it('should give the user the option to contact the person requesting help');

  it('should give the user the option to volunteer / sign up for a need by clicking a separate button');
});
