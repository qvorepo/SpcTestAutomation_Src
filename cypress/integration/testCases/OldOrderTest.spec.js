/// <reference types="Cypress" />
/**
 * Connect to the SPC.db database
 * Query the Orders, OrderItems, and Modifiers table.
 * Validate that none of the records has DateUpdated that is older than 24 hours.
 * Records older than 24 hours should be removed by the Data Sync and Data API service.
 */
describe('Old Order In Database Test', () => {
    it('Check if Orders, OrderItems, and Modifiers older than 24 hours are properly removed - Test', () => {
      var oldOrder=false;
      var oldItem=false;
      var oldModifier=false;
      const hoursPast=28;

      const ordersQuery='SELECT * from ORDERS;'
      const itemsQuery='SELECT * from ORDERITEMS;'
      const modifiersQuery='SELECT * from MODIFIERS;'

      var currentDate=Cypress.moment().utc();
      var diff=0;
      var diffInHours=0;

      cy.log('Current date in UTC ' + currentDate.toISOString());

      cy.task('querySpcDb', ordersQuery).then((rows) => {
        //expect(rows).to.have.lengthOf(1);
        diff=0;
        diffInHours=0;
       
        for(var i=0; i<rows.length; i++)
        {
           diff = currentDate.valueOf() -(Cypress.moment(rows[i].DateCreated).utc().valueOf());
           diffInHours=diff/1000/60/60; // Convert milliseconds to hours
          cy.log('diffInHours '+ diffInHours);
          if(diffInHours>hoursPast)
          {
            oldOrder=true;
            cy.log('Old Order ' + rows[i].DateCreated + ", DbId "+ rows[i].DbId);
          }
          expect(oldOrder).to.be.false;
        }
        
        });//Query Orders table

        cy.task('querySpcDb', itemsQuery).then((itemRows) => {
          diff=0;
          diffInHours=0;
         
          for(var i=0; i<itemRows.length; i++)
          {
             diff = currentDate.valueOf() -(Cypress.moment(itemRows[i].DateUpdated).utc().valueOf());
             diffInHours=diff/1000/60/60; // Convert milliseconds to hours
            cy.log('diffInHours '+ diffInHours);
            if(diffInHours>hoursPast)
            {
              oldItem=true;
              cy.log('Old Item ' + itemRows[i].DateUpdated + ", DbId "+ itemRows[i].DbId);
            }
            expect(oldItem).to.be.false;
          }
          
          });//Query OrderItems table

          cy.task('querySpcDb', modifiersQuery).then((modifierRows) => {
            diff=0;
            diffInHours=0;
           
            for(var i=0; i<modifierRows.length; i++)
            {
               diff = currentDate.valueOf() -(Cypress.moment(modifierRows[i].DateUpdated).utc().valueOf());
               diffInHours=diff/1000/60/60; // Convert milliseconds to hours
               cy.log('diffInHours '+ diffInHours);
            if(diffInHours>hoursPast)
              {
                oldModifier=true;
                cy.log('Old Modifier ' + modifierRows[i].DateUpdated + ", DbId "+ modifierRows[i].DbId);
              }
              expect(oldModifier).to.be.false;
            }
            
            });//Query Modifier table

            
         
    }) 
  
    })