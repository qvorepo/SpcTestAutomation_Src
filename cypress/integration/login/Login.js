import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
    Given('I visit starbucks.com', () => {
      cy.visit('https://starbucks.com'); 
      cy.wait(4000); 
      cy.get('#truste-consent-button').contains('Agree').click();
      cy.get('.sb-button.sb-button--text.m1').contains('Not Now').click();
    });
    When('I signin as invalid user', () => {
      cy.get('a').contains('Sign in').click({ force: true });
      cy.get('input[id="username"]').clear();
      cy.get('input[id="username"]').type('YourUserId@starbucks.com')
      cy.get('.block.option__labelMarker').click();

      cy.get('#password').clear();
      cy.get('#password').type('1234!@89');


      cy.get('button').contains('Sign in').click();
 
        });
    Then('Login failed', () => {
        cy.get('h3.sb-heading.sb-heading--medium')
            .contains('Sign in unsuccessful.').invoke('text').then((txt)=>{
              expect(txt).to.eq('Sign in unsuccessful.');
              
            }); 

        cy.get('.mt2').invoke('text')
        .then((txt2)=>{
          expect(txt2).to.equal('The email or password you entered is not valid. Please try again.');
          
        }); 
        //expect(txt).to.include('Please try again.');)    
           
        });