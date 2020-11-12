/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage_PageObjects';

describe('Curbside Arrival Message Submision Validation', () => {
  it('Curbside Arrival Message Submision To Order Router Service End Point', () => {

    const homePage=new HomePage();

    const storeNbr=Cypress.env("locId");
    const endPoint='http://localhost:9101/spc/api/v1/routes/curbside';
    const name='Quang';

   const spot = Cypress._.random(1, 12);

    const checkIntime=Cypress.moment().toISOString();

  cy.request('POST', endPoint, 
  { 
    "id": "ee8348ea-d89f-4453-bb68-906076eda86e",
    "orderToken": "10544104575056441237409291245486",
    "customer": {
        "displayName": name,
        "location": {
            "type": "Other",
            "id": "060f1c96-b922-4223-a225-a0dbbf3914bf",
            "description": spot
        },
        "identifications": [ ]
    },
    "storeNumber": storeNbr,
    "status": "Arrived",
    "createdDate": checkIntime,
    "modifiedDate": checkIntime 
 }
  )
  .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(202)
  });

  cy.log('Successfully submitted a post message to curbside end point ' + endPoint + " to store #" + storeNbr)
  cy.log('Name: ' + name);
  cy.log('Spot: ' + spot);
  cy.log('Check-In Time: ' + checkIntime);
          
 



        



  }) 

})