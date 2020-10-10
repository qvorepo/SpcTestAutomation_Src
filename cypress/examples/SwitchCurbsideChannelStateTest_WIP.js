/// <reference types="Cypress" />

import HomePage from '../../support/pageObjects/HomePage'

describe('Switch Curbside Channel State Test', () => {
  it('Switch Curbside Channel State Test', () => {

    const homePage=new HomePage();

    cy.visit('https://uspc01s3000722:3001/home');

    cy.title().should('eq', 'Label Routing Admin');

    /** Curbside channel on or off state */
    homePage.getCurbsideState().invoke('text').then((text1) => {
    cy.wait(2000);
    cy.log('Curbside Channel original state: ' + text1); 
    homePage.getCurbsideState().scrollIntoView(); 

          //OFF state channel is supposed to be turned on automatically at middnight.
          if(text1.startsWith('off'))
          {
            cy.log('Curbside channel state is OFF');
            //Switch Curbside channel on
            homePage.getCurbsideEditButton().click();
            homePage.getCurbsideSwitchButton().click();
            homePage.getCurbsideSaveButton().click();
            cy.log('Curbside channel has been turned on.');


            //Switch Curbside channel off again, returning it to the original state.
            homePage.getCurbsideEditButton().click();
            homePage.getCurbsideSwitchButton().click();
            homePage.getCurbsideSaveButton().click();
            homePage.getCurbsideState().invoke('text').then((text2) => {
              cy.wait(2000);
              expect(text2).to.equal('off');
            });
            cy.log('Curbside channel has been turned off again, returned to its original state.');

          }//End if
          else  if(text1.startsWith('on')){

            

            //Turn Curbside channel off
            homePage.getCurbsideEditButton().click();
            cy.wait(1000);
            cy.get('.model-content').invoke('text').then((textModal) => {
              expect(textModal).contain('Are you sure you want to turn the Curbside channel off?');
            });
            //cy.get('.model-content').should('have.value','Are you sure you want to turn the Curbside channel off?');
            homePage.getCurbsideSwitchButton().click();
            homePage.getCurbsideSaveButton().click();
            cy.log('Curbside channel has been turned off.');


            //Turn Curbside channel on again, returning it to the original state.
            homePage.getCurbsideEditButton().click();
            homePage.getCurbsideSwitchButton().click();
            homePage.getCurbsideSaveButton().click();            

            homePage.getCurbsideState().invoke('text').then((text3) => {
              cy.wait(2000);
              expect(text3).to.equal('on');
            });
            cy.log('Curbside channel has been turned on again, returned to its original state.');
          
          }
    });


  






       

  }) 

})