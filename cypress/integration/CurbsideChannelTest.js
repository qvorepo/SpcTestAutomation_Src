/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage_PageObjects';

describe('Curbside Channel Test', () => {
  it('Curbside Channel Test', () => {

    const homePage=new HomePage();

    cy.visit('https://uspc01s3000722:3001/home');

    cy.title().should('eq', 'Label Routing Admin');

    //Invoke and assert channelStates end point
    cy.server();
    cy.route(
      {
        method: 'GET',
        url: 'api/v1/channels/channelstates',
        status: 200,
        delay: 1000
      }).as('GetChannelState');
      //cy.get('h3').contains('Channels').should('have.value', 'Channels');
    
        // Time comparison
        const midnight=Cypress.moment('12:00 AM', 'LT');
        var format = 'hh:mm:ss';
        const currentDateTime =Cypress.moment();
        //const currentDateTime=Cypress.moment().format('h:mm A'); 
        const currentDate=currentDateTime.format('MM DD, YYYY');
        const currentTime =currentDateTime.format('h:mm A');
        cy.log('Current date ' + currentDate);
        cy.log('Current time  ' + currentTime)

        //var startTime = Cypress.moment( '11:50 PM', 'LT');
        //var endTime = Cypress.moment(  '11:59 PM', 'LT');
    
        /** Curbside channel on or off state */
        homePage.getCurbsideState().scrollIntoView();
        homePage.getCurbsideState().invoke('text').then((text1) => {
            cy.wait(2000);
 
            //OFF state channel is supposed to be turned on automatically at middnight.
            if(text1.includes('off'))
            {
              cy.log('Curbside channel state is OFF');
            
              if (currentTime.toString().includes('11:') && currentTime.toString().includes('PM'))
              {
                cy.wait(180000)//Wait for 3 minutes.
                cy.reload();
                cy.wait(3000)//Wait 
                homePage.getCurbsideState().scrollIntoView(); 
                
                homePage.getCurbsideState().invoke('text').then((text3) => {
                  expect(text3).eq('on');
                  cy.log('Curbside channel state was off and has been turned on automatically by the system.');
                  cy.wait(2000)//Wait for 2 seconds, so that it will show on the video.
                  homePage.getCurbsideState().scrollIntoView();  
                });
              } else 
              {
                cy.wait(2000)//Wait for 2 seconds, so that it will show on the video.
                  homePage.getCurbsideState().scrollIntoView(); 
                cy.log('Curbside channel state was off and remained in this state until midnight.');
              }
       
            } 

            //ON State
            else if (text1.includes('on'))
            {
              cy.log('Curbside channel state is ON');

              homePage.getCurbsideState().scrollIntoView();
              cy.wait(180000)//Wait for 3 minutes.
              cy.reload();
              homePage.getCurbsideState().scrollIntoView();
              cy.wait(2000)//Wait for 2 seconds for it for show on the video.

              homePage.getCurbsideState().invoke('text').then((text2) => {
                expect(text2).eq('on');
                cy.log('Curbside channel state was on and is remained on.');
              });

       
            }//it
				
          
          })//Describe
		  


  



  }) 

})