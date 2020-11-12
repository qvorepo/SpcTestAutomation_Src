import { Given, When, Then, } from 'cypress-cucumber-preprocessor/steps';
/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage_PageObjects';
const homePage=new HomePage();
const routingStateFile='C:/SPC/ClientData/routing_state.json';
const alertMsg='Routing changed: Off-Peak is now active';//Should be Off-Peak

    Given('I visit Label Routing Admin homepage', () => {
        cy.visit('https://uspc01s3000722:3001/home');

    
 
    });//Given

    Then('Page Title is correct', () => {
      cy.title().should('equal', 'Label Routing Admin');
    });//When


    When('I select the Off-Peak option', () => {

          /* Off-peak radio button */
        homePage.getOffPeakRadioBtn().click();
        cy.log('Off-peak radio button was clicked');
        cy.wait(2000);
    
    });//When

    Then('Off-Peak alert message should be displayed', () => {
        //homePage.getAlertSuccessBox().invoke('text').should('contain', alertMsg);
        homePage.getAlertSuccessBox().invoke('text').should('contain', 'Routing changed: Off-Peak is now active');//Should be Off-Peak

    });//Then

    Then('Off-Peak state should be saved to RoutingState JSON file', () => {
      cy.readFile(routingStateFile).then((json) => {
          
        expect(json.CurrentTemplate).to.equal('off-peak');//Should be off-peak
        cy.log(routingStateFile+ " has the currentTemplate " + json.CurrentTemplate);
      });//End read file

      
    });//Then



   
		
	 