describe('Barn Raiser Help Request Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('I Need Help').click();
  });

  it('should show the correct form on the page', () => {

  });

  it('should allow the user to input their data and create a new help request', () => {

  });

  it('should give a visual indicator that the request has been submitted / recieved');

  it('should show the newly created request on the requests list page');

  it('should not allow the user to submit if any data is missing');
});
