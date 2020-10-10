import { Given, When, Then, } from 'cypress-cucumber-preprocessor/steps';
/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage_PageObjects';
const homePage=new HomePage();
const routingStateFile='C:/SPC/ClientData/routing_state.json';
const alertMsg='Routing changed: Lunch is now active';

When('I select the Lunch option', () => {

  /* Peak radio button */
  homePage.getLunchRadioBtn().click();
  cy.log('Lunch radio button was clicked');
  cy.wait(2000);

});//When

Then('Lunch alert message should be displayed', () => {
  homePage.getAlertSuccessBox().invoke('text').should('contain', alertMsg);

});//Then

Then('Lunch state should be saved to RoutingState JSON file', () => {
  cy.readFile(routingStateFile).then((json) => {
    
  expect(json.CurrentTemplate).to.equal('lunch');//Should be lunch
  cy.log(routingStateFile + " has the currentTemplate " + json.CurrentTemplate);

});//End read file


});//Then
   
		