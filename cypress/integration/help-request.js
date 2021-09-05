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

  it('should allow the user to input their data and create a new help request', () => {
    cy.get('input[name="email"]').type('test.email@gmail.com');
    cy.get('input[name="zipCode"]').type('80230');
    cy.get('input[name="needDate"]').type('2021-09-15');
    cy.get('input[name="startTime"]').type('09:00:00');
    cy.get('input[name="endTime"]').type('15:00:00');
    cy.get('input[name="volunteersNeeded"]').type('10');
    cy.get('input[name="needTitle"]').type('Help Hand Out Food at Lowry Festival');
    cy.get('input[name="needDescription"]').type('Come help me hand out food during Lowry Festival');
    cy.get('button').contains('Submit').click();
  });

  it('should give a visual indicator that the request has been submitted / recieved', () => {
    cy.get('input[name="email"]').type('test.email@gmail.com');
    cy.get('input[name="zipCode"]').type('80230');
    cy.get('input[name="needDate"]').type('2021-09-15');
    cy.get('input[name="startTime"]').type('09:00:00');
    cy.get('input[name="endTime"]').type('15:00:00');
    cy.get('input[name="volunteersNeeded"]').type('1');
    cy.get('input[name="needTitle"]').type('Read to My Grandma');
    cy.get('input[name="needDescription"]').type('I need someone to come read to my grandma this Wednesday');
    cy.get('button').contains('Submit').click();
    cy.get('h3').contains('Success! Your submission has been recorded.').should('be.visible');
  });

  it('should show the newly created request on the requests list page', () => {
    cy.get('input[name="email"]').type('test.email@gmail.com');
    cy.get('input[name="zipCode"]').type('80230');
    cy.get('input[name="needDate"]').type('2021-09-15');
    cy.get('input[name="startTime"]').type('09:00:00');
    cy.get('input[name="endTime"]').type('15:00:00');
    cy.get('input[name="volunteersNeeded"]').type('3');
    cy.get('input[name="needTitle"]').type('Help Me Weed the Garden');
    cy.get('input[name="needDescription"]').type('Come help me weed the community garden outside Denver Church!');
    cy.get('button').contains('Submit').click();
    cy.wait(100);
    cy.get('a').eq('1').click();
    cy.url().should('include', '/NeedList');
    cy.get('.all-needs').should('be.visible');
    cy.get('h4').contains('Help Me Weed the Garden').should('be.visible');
    cy.get('p').contains('Come help me weed the community garden outside Denver Church!').should('be.visible');
    cy.get('p').contains('80230').should('be.visible');
    cy.get('p').contains('09/15/2021').should('be.visible');
    cy.get('p').contains('09:00am -').should('be.visible');
    cy.get('p').contains('3:00pm').should('be.visible');
    cy.get('p').contains('3').should('be.visible');
  });

  it('should not allow the user to submit if any data is missing', () => {
    cy.get('button').contains('Submit').click();
    cy.url().should('include', '/NeedForm');
    cy.get('h3').contains('Warning: Your submission could not go through.').should('be.visible');
  });

  it('should not allow the user to submit if the start time is after the end time', () => {

  });

  it('should not allow the user to submit if the email address is not in a valid format', () => {

  });

  it('should not allow the user to submit if the zip code is in an invalid format', () => {

  });

  it('should give a visual indicator if the request cannot be submitted', () => {

  });
});
