/// <reference types="Cypress" />
describe('Find and remove logs older than 14 days', () => {

    /** 
   * Search for logs older than 14 days and delete.
   * This test is intended on the SPC device.
   */
  it('Remove logs older than 14 days.', () => {
    cy.task('purgeOldLogs', '').then((res) => {});
  
    
  }) 
  
  
  
  })