/// <reference types="Cypress" />
describe('Database Connection Test', () => {
    it('Database Connection Test', () => {
      
     
      // cy.task('queryDb', 'Select * from Orders')
      // .then(results =>{
      //   expect(results).to.have.lengthOf(1);
      // });

      cy.task('log', 'This message is logged from log task');
         

    }) 

  })