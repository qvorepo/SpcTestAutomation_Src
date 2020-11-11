/// <reference types="Cypress" />
/**
 * Connect to the SPC.db database
 * Query the Orders, OrderItems, and Modifiers table.
 * Validate that none of the records has DateUpdated that is older than 24 hours.
 * Records older than 24 hours should be removed by the Data Sync and Data API service.
 */
describe('Old Order Removal Validation', () => {
    it('Check if Orders, OrderItems, and Modifiers older than 24 hours are properly removed - Test', () => {
      var oldOrder=false;
      var oldItem=false;
      var oldModifier=false;

      const queryOrders='SELECT * from ORDERS;'
      const queryItems='SELECT * from ORDERITEMS;'
      const queryModifier='SELECT * from MODIFIERS;'

      var oldDate=Cypress.moment().utc().subtract(1,'day');//Old date is 1 day + 4 hours in the past
      oldDate=oldDate.subtract(4,'hour');
      cy.log('Old date in UTC ' + oldDate.toString())

      cy.task('querySpcDb', queryOrders).then((rows) => {
        //expect(rows).to.have.lengthOf(1);
       
        for(var i=0; i<rows.length; i++)
        {
          if(Cypress.moment(rows[i].DateUpdated) <oldDate)
          {
            oldOrder=true;
            cy.log('Old Date ' + rows[i].DateUpdated);
            
          }
          expect(oldOrder).to.be.false;
          //cy.log(`${dbidLabel}` + rows[i].DbId + `${custNameLabel}` + rows[i].CustomerName + `${dateUpdatedLabel}` + rows[i].DateUpdated)
        }
        
        });//Query Orders table

        cy.task('querySpcDb', queryItems).then((rows) => {
          //expect(rows).to.have.lengthOf(1);
         
          for(var i=0; i<rows.length; i++)
          {
            if(Cypress.moment(rows[i].DateUpdated) <oldDate)
            {
              oldItem=true;
              cy.log('Old Item ' + rows[i].DateUpdated);
              
            }
            expect(oldItem).to.be.false;
            //cy.log(`${dbidLabel}` + rows[i].DbId + `${custNameLabel}` + rows[i].CustomerName + `${dateUpdatedLabel}` + rows[i].DateUpdated)
          }
          
          });//Query OrderItems table

          cy.task('querySpcDb', queryModifier).then((rows) => {
            //expect(rows).to.have.lengthOf(1);
           
            for(var i=0; i<rows.length; i++)
            {
              if(Cypress.moment(rows[i].DateUpdated) <oldDate)
              {
                oldModifier=true;
               
              }
              expect(oldModifier).to.be.false;
              //cy.log(`${dbidLabel}` + rows[i].DbId + `${custNameLabel}` + rows[i].CustomerName + `${dateUpdatedLabel}` + rows[i].DateUpdated)

            }
            
            });//Query Modifier table

            
         
    }) 
  
    })