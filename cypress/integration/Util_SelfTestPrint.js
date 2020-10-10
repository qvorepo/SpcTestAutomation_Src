/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage'

describe('Self Tests', () => {
  const endPoint='http://localhost:9101/spc/api/v1/routes/SelfTest?printerName=';
  //http://localhost:9101/spc/api/v1/routes/SelfTest?printerName=
  const successMsg='Successfully printed a label on ';

  it('Test print on Bar 1', () => {
    const endPointBar1=endPoint + 'Bar1';

  cy.request('POST', endPointBar1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(201)
  });

  cy.log(successMsg + "Bar1 .  Endpoint=>" + endPointBar1 )

  }) ;// Bar 1

  it('Test print on Bar 2', () => {
    const endPointBar2=endPoint+ "Bar2";
    cy.request('POST', endPointBar2
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(201)
    });

    cy.log(successMsg + "Bar2 .  Endpoint=>" + endPointBar2 );
    }) ;// Bar 2

  it('Test print on Bar 3', () => {
    const endPointBar3=endPoint+ "Bar3";

    cy.request('POST', endPointBar3
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(201)
    });

    cy.log(successMsg + "Bar3 .  Endpoint=>" + endPointBar3 );
  }) ;// Bar 3

  //ColdBeverageStation1
  it('Test print on ColdBeverageStation1', () => {

    const homePage=new HomePage();
    const endPointCBS=endPoint+'ColdBeverageStation1';

  cy.request('POST', endPointCBS
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(201)
  });

  cy.log(successMsg + "CBS .  Endpoint=>" + endPointCBS )
  }) ;// ColdBeverageStation1

  it('Test print on DriveThru1', () => {
      const endPointDriveThru1=endPoint+ "DriveThru1";

  cy.request('POST', endPointDriveThru1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(201)
  });

  cy.log(successMsg + "DriveThru1 .  Endpoint=>" + endPointDriveThru1 );
  }) ;// Warming 1

  it('Test print on Warming 1', () => {
      const endPointWarming1=endPoint + "Warming1";

      cy.request('POST', endPointWarming1
      ) .then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.status).to.eq(201)
      });

      cy.log(successMsg + "Warming1 .  Endpoint=>" + endPointWarming1 );
    }) ;// Warming 1

  it('Test print on Warming 2', () => {

    const homePage=new HomePage();
    const endPointWarming2=endPoint+'Warming2';

  cy.request('POST', endPointWarming2
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(201)
  });

  cy.log(successMsg + "Warming2 .  Endpoint=>" + endPointWarming2 );
  }) ;// Warming 2

})