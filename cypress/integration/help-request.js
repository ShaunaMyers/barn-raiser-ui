describe('Barn Raiser Help Request Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('I Need Help').click();
  });

  it('should allow the user to go back to the home page by clicking on the BarnRaiser logo', () => {
    cy.get('h1').contains('BarnRaiser').click();
    cy.get('h2').contains('Are You Looking for Assistance?').should('be.visible');
    cy.get('button').contains('I Need Help').should('be.visible');
    cy.get('h3').contains('Can You Offer Assistance?').should('be.visible');
    cy.get('button').contains('Give Help').should('be.visible');
  });

  it('should show the correct form on the page', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="zipCode"]').should('be.visible');
    cy.get('input[name="needDate"]').should('be.visible');
    cy.get('input[name="startTime"]').should('be.visible');
    cy.get('input[name="endTime"]').should('be.visible');
    cy.get('input[name="volunteersNeeded"]').should('be.visible');
    cy.get('input[name="needTitle"]').should('be.visible');
    cy.get('input[name="needDescription"]').should('be.visible');
    cy.get('button').contains('Submit').should('be.visible');
  });

  it('should allow the user to input their data and create a new help request');

  it('should give a visual indicator that the request has been submitted / recieved');

  it('should show the newly created request on the requests list page');

  it('should not allow the user to submit if any data is missing');

  it('should not allow the user to submit if the start time is after the end time');

  it('should not allow the user to submit if the email address is not in a valid format');

  it('should not allow the user to submit if the zip code is in an invalid format');

  it('should give a visual indicator if the request cannot be submitted');
});
