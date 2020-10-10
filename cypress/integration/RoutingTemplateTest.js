/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage_PageObjects'

describe('Routing Template Test', () => {
  it('Routing Template Test', () => {

    const homePage=new HomePage();

    cy.visit('https://uspc01s3000722:3001/home');

    cy.title().should('eq', 'Label Routing Admin')
   
    /* Off-peak radio button */
    homePage.getOffPeakRadioBtn().click();
    cy.log('Off-peak radio button was clicked');
    cy.wait(2000);
    
    //Route message to display once the radio button is clicked.
    homePage.getOffPeakRouteMessage().invoke('text').then((txt) => {
      //expect(txt).contain('Routing is Active');
    });

    homePage.getAlertSuccessBox().invoke('text').then((offPeakTemplateAlert) => {
      expect(offPeakTemplateAlert).to.contain('Routing changed: Off-Peak is now active');
    });

    cy.readFile('C:/SPC/ClientData/routing_state.json').then((json) => {
      
      expect(json.CurrentTemplate).to.equal('off-peak');//Should be off-peak
      cy.log('File C:/SPC/ClientData/routing_state.json' + " has the currentTemplate " + json.CurrentTemplate);
    });//End read file
    


      /* Peak radio button */
      homePage.getPeakRadioBtn().click();
      cy.log('Peak radio button was clicked');
      cy.wait(2000); 

      //Route message to display once the radio button is clicked.
      homePage.getPeakRouteMessage().invoke('text').then((txt2) => {
        //expect(txt2).contain('Routing is Active');
      })
      cy.readFile('C:/SPC/ClientData/routing_state.json').then((json2) => {
        expect(json2.CurrentTemplate).to.equal('peak');//Should be peak, this will fail the test
        cy.log('File C:/SPC/ClientData/routing_state.json' + " has the currentTemplate " + json2.CurrentTemplate);
      });//End read file

        /* Lunch radio button */
        homePage.getLunchRadioBtn().click();
        cy.log('Lunch radio button was clicked');
        cy.wait(2000);

        //Route message to display once the radio button is clicked.
        homePage.getLunchRouteMessage().invoke('text').then((txt3) => {
          //expect(txt3).contain('Routing is Active');
        });

        homePage.getAlertSuccessBox().invoke('text').then((lunchTemplateAlert) => {
          expect(lunchTemplateAlert).to.contain('Routing changed: Lunch is now active');
        });
        cy.readFile('C:/SPC/ClientData/routing_state.json').then((json3) => {
          expect(json3.CurrentTemplate).to.equal('lunch');
          cy.log('File C:/SPC/ClientData/routing_state.json' + " has the currentTemplate " + json3.CurrentTemplate);
          
        });//End read file

        /* Peak radio button */
        homePage.getPeakRadioBtn().click();
        cy.log('Peak radio button was clicked');
        cy.wait(2000);

        //Route message to display once the radio button is clicked.
        homePage.getPeakRouteMessage().invoke('text').then((txt2) => {
          //expect(txt2).contain('Routing is Active');
        });

        homePage.getAlertSuccessBox().invoke('text').then((peakTemplateAlert) => {
          expect(peakTemplateAlert).to.contain('Routing changed: Peak is now active');
        });
        cy.readFile('C:/SPC/ClientData/routing_state.json').then((json4) => {
        
          expect(json4.CurrentTemplate).to.equal('peak');
          cy.log('File C:/SPC/ClientData/routing_state.json' + " has the currentTemplate " + json4.CurrentTemplate);
        });//End read file
        
  


  }) 

})