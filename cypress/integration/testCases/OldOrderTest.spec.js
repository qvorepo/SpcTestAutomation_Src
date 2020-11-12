/// <reference types="Cypress" />
/**
 * Connect to the SPC.db database
 * Query the Orders, OrderItems, and Modifiers table.
 * Validate that none of the records has DateUpdated that is older than 24 hours.
 * Records older than 24 hours should be removed by the Data Sync and Data API service.
 */
describe('Old Order Validation', () => {
    it('Check if Orders, OrderItems, and Modifiers older than 24 hours are properly removed - Test', () => {
      var oldOrder=false;
      var oldItem=false;
      var oldModifier=false;
      const hoursPast=28;

      const ordersQuery='SELECT * from ORDERS;'
      const itemsQuery='SELECT * from ORDERITEMS;'
      const modifiersQuery='SELECT * from MODIFIERS;'

      var oldDate=Cypress.moment().utc().subtract(1,'day');//Old date is 1 day + 4 hours in the past
      oldDate=oldDate.subtract(4,'hour');
      cy.log('Old date in UTC ' + oldDate.toISOString())

      cy.task('querySpcDb', ordersQuery).then((rows) => {
        //expect(rows).to.have.lengthOf(1);
       
        for(var i=0; i<rows.length; i++)
        {
          if((Cypress.moment().utc(rows[i].DateCreated) - oldDate)>hoursPast)
          {
            oldOrder=true;
            cy.log('Old Order ' + rows[i].DateCreated + ", DbId "+ rows[i].DbId);
            
          }
          expect(oldOrder).to.be.false;
        }
        
        });//Query Orders table

        cy.task('querySpcDb', itemsQuery).then((itemRows) => {
          //expect(rows).to.have.lengthOf(1);
         
          for(var i=0; i<itemRows.length; i++)
          {
            if((Cypress.moment().utc(itemRows[i].DateUpdated) - oldDate)>hoursPast)
            {
              oldItem=true;
              cy.log('Old Item ' + itemRows[i].DateUpdated + ", DbId "+ itemRows[i].DbId);
            }

            expect(oldItem).to.be.false;
            //cy.log(`${dbidLabel}` + rows[i].DbId + `${custNameLabel}` + rows[i].CustomerName + `${dateUpdatedLabel}` + rows[i].DateUpdated)
          }
          
          });//Query OrderItems table

          cy.task('querySpcDb', modifiersQuery).then((modifierRows) => {
            //expect(rows).to.have.lengthOf(1);
           
            for(var i=0; i<modifierRows.length; i++)
            {
              if((Cypress.moment().utc(modifierRows[i].DateUpdated) - oldDate)>hoursPast)
              {
                oldModifier=true;
                cy.log('Old Modifier ' + modifierRows[i].DateUpdated + ", DbId "+ modifierRows[i].DbId);
              }
              expect(oldModifier).to.be.false;
              //cy.log(`${dbidLabel}` + rows[i].DbId + `${custNameLabel}` + rows[i].CustomerName + `${dateUpdatedLabel}` + rows[i].DateUpdated)

            }
            
            });//Query Modifier table

            
         
    }) 
  
    })