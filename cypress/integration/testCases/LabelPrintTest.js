/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage_PageObjects'; 

describe('Label Printing Capability Test', () => {
  it('Label Print Test', () => {

    const homePage=new HomePage();

    cy.visit(Cypress.env('hostName')+':3001/home');

    cy.title().should('eq', 'Label Routing Admin');
   
        /** Printer test capability */
        //Test print to Bar 1 printer
          homePage.getPrinter().first().click();
          cy.wait(1000) ;
          
          homePage.getAlertSuccessBox().invoke('text').then((text1) => {
            expect(text1).to.contain('Now test printing to Bar 1');
          
          })

          cy.wait(2000);
          //Test print to Ticket Printer
          homePage.getPrinter().last().click();
          cy.wait(1000) ;
          
          homePage.getAlertSuccessBox().invoke('text').then((text2) => {
            expect(text2).to.contain('Now test printing to Ticket Printer');
          
          })
		  
          cy.wait(2000);
          //Test print to all printers.
          homePage.getAllPrinters().click();
          cy.wait(1000) ;
          
          homePage.getAlertSuccessBox().invoke('text').then((text3) => {
            expect(text3).to.contain('Now test printing to all labelers');
          
          })		  



        
       // Write logs for each printer name.
        cy.get('.col-xs-12 .rounded-box').each(($el, index, $list)=>
        {
          $el.find('.test-print').click(); 
          cy.log($el.find('h3').text());
       
        });



  }) 

})