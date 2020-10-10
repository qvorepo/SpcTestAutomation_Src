/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage'

describe('Soft Label Pull', () => {
  const endPoint='http://localhost:9107/spc/api/v1/print/pull?name=';

  it('Pull Label on Bar 1', () => {
    const endPointBar1=endPoint + 'Bar1';

  cy.request('POST', endPointBar1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log('Successfully pulled a label on Bar 1 printer ' + endPointBar1 )

  }) ;// Bar 1

  it('Pull Label on Bar 2', () => {
    const endPointBar2=endPoint+ "Bar2";
    cy.request('POST', endPointBar2
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(202)
    });

    cy.log('Successfully pulled a label on Bar 2 printer ' + endPointBar2 )
    }) ;// Bar 2

  it('Pull Label on Bar 3', () => {
    const endPointBar3=endPoint+ "Bar3";

    cy.request('POST', endPointBar3
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(202)
    });

    cy.log('Successfully pulled a label on Bar 3 printer ' + endPointBar3 )
  }) ;// Bar 3

  //ColdBeverageStation1
  it('Pull Label on ColdBeverageStation1', () => {

    const homePage=new HomePage();
    const endPointCBS=endPoint+'ColdBeverageStation1';

  cy.request('POST', endPointCBS
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log('Successfully pulled a label on Bar 3 printer ' + endPointCBS)
  }) ;// ColdBeverageStation1

  it('Pull Label on DriveThru1', () => {
      const endPointDriveThru1=endPoint+ "DriveThru1";

  cy.request('POST', endPointDriveThru1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log('Successfully pulled a label on DriveThru1 printer '  + endPointDriveThru1)
  }) ;// Warming 1

  it('Pull Label on Warming 1', () => {
      const endPointWarming1=endPoint + "Warming1";

      cy.request('POST', endPointWarming1
      ) .then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.status).to.eq(202)
      });

      cy.log('Successfully pulled a label on Warming 1 printer ' + endPointWarming1)
    }) ;// Warming 1

  it('Pull Label on Warming 2', () => {

    const homePage=new HomePage();
    const endPointWarming2=endPoint+'Warming2';

  cy.request('POST', endPointWarming2
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log('Successfully pulled a label on Warming 2 printer ' + endPointWarming2)
  }) ;// Warming 2

})