import { Given, When, Then, } from 'cypress-cucumber-preprocessor/steps';
/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage_PageObjects';
const homePage=new HomePage();
const routingStateFile='C:/SPC/ClientData/routing_state.json';
const alertMsg='Routing changed: Peak is now active';

    
When('I select the Peak option', () => {

  /* Peak radio button */
homePage.getPeakRadioBtn().click();
cy.log('Peak radio button was clicked');
cy.wait(2000);

});//When

Then('Peak alert message should be displayed', () => {
  homePage.getAlertSuccessBox().invoke('text').should('contain', alertMsg);

});//Then

Then('Peak state should be saved to RoutingState JSON file', () => {
  cy.readFile(routingStateFile).then((json) => {
    expect(json.CurrentTemplate).to.equal('peak');//Should be peak
    cy.log(routingStateFile + " has the currentTemplate " + json.CurrentTemplate);
});//End read file


});//Then
	 