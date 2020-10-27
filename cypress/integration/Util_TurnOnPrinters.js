/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage_PageObjects';

describe('Turn On Printers', () => {
  //end point http://localhost:9107/spc/api/v1/print/state?name=Chit1&state=Offline
  const prefix='http://localhost:9107/spc/api/v1/print/state?name=';
  const suffix='&state=OK';
  //http://localhost:9101/spc/api/v1/routes/SelfTest?printerName=
  const successMsg='Successfully turned on ';

  it.skip('Turn on printer Bar1', () => {
    const endPointBar1=prefix + 'Bar1' + suffix;

  cy.request('POST', endPointBar1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log(successMsg + "Bar1 .  Endpoint=>" + endPointBar1 )

  }) ;// Bar 1

  it('Turn on printer Bar2', () => {
    const endPointBar2=prefix + 'Bar2' + suffix;
    cy.request('POST', endPointBar2
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(202)
    });

    cy.log(successMsg + "Bar2 .  Endpoint=>" + endPointBar2 );
    }) ;// Bar 2

  it.skip('Turn on printer Bar3', () => {
    const endPointBar3=prefix + 'Bar3' + suffix;

    cy.request('POST', endPointBar3
    ) .then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(202)
    });

    cy.log(successMsg + "Bar3 .  Endpoint=>" + endPointBar3 );
  }) ;// Bar 3

  //ColdBeverageStation1
  it.skip('Turn on printer on ColdBeverageStation1', () => {

    const homePage=new HomePage();
    const endPointCBS= prefix + 'ColdBeverageStation1' + suffix;
    prefix + 'ColdBeverageStation1' + suffix;

  cy.request('POST', endPointCBS
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log(successMsg + "CBS .  Endpoint=>" + endPointCBS )
  }) ;// ColdBeverageStation1

  it.skip('Turn on print on DriveThru1', () => {
      const endPointDriveThru1= prefix + 'DriveThru1' + suffix;

  cy.request('POST', endPointDriveThru1
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log(successMsg + "DriveThru1 .  Endpoint=>" + endPointDriveThru1 );
  }) ;// Warming 1

  it.skip('Turn on print on Warming 1', () => {
      const endPointWarming1=prefix + 'Warming1' + suffix;

      cy.request('POST', endPointWarming1
      ) .then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.status).to.eq(202)
      });

      cy.log(successMsg + "Warming1 .  Endpoint=>" + endPointWarming1 );
    }) ;// Warming 1

  it.skip('Turn on print on Warming 2', () => {

    const homePage=new HomePage();
    const endPointWarming2= prefix + 'Warming2' + suffix;

  cy.request('POST', endPointWarming2
  ) .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log(successMsg + "Warming2 .  Endpoint=>" + endPointWarming2 );
  }) ;// Warming 2

})