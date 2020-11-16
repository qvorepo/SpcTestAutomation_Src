/// <reference types="Cypress" />
/**
 * Connect to the SPC.db database
 * Query the Orders, OrderItems, and Modifiers table.
 * Verify the dates are in Utc Format By Containing 'T'
 */
describe('Date In Database in Utc Format Test', () => {
    it('Date/Time In Database in Utc Format Test', () => {
      var orderDateInUtcFormat=true;
      var itemDateInUtcFormat=true;
      var modifierDateInUtcFormat=true;

      const ordersQuery='SELECT * from ORDERS;'
      const itemsQuery='SELECT * from ORDERITEMS;'
      const modifiersQuery='SELECT * from MODIFIERS;'

      cy.task('querySpcDb', ordersQuery).then((rows) => {

        for(var i=0; i<rows.length; i++)
        {
          
          if(!rows[i].DateUpdated.includes('T') && !rows[i].DateCreated.includes('Z'))
          {
            orderDateInUtcFormat=false;
            //cy.log('Old Order ' + rows[i].DateCreated + ", DbId "+ rows[i].DbId);
          }
          expect(orderDateInUtcFormat).to.be.true;
        }
        
        });//Query Orders table

        cy.task('querySpcDb', itemsQuery).then((itemRows) => {

          for(var i=0; i<itemRows.length; i++)
          {
            if(!itemRows[i].DateUpdated.includes('T') && !itemRows[i].DateUpdated.includes('Z'))
            {
              itemDateInUtcFormat=false;
              //cy.log('Old Item ' + itemRows[i].DateUpdated + ", DbId "+ itemRows[i].DbId);
            }
            expect(itemDateInUtcFormat).to.be.true;
          }
          
          });//Query OrderItems table

          cy.task('querySpcDb', modifiersQuery).then((modifierRows) => {
           
            for(var i=0; i<modifierRows.length; i++)
            {
            if(!modifierRows[i].DateUpdated.includes('T') && !modifierRows[i].DateUpdated.includes('Z'))
              {
                modifierDateInUtcFormat=false;
                //cy.log('Old Modifier ' + modifierRows[i].DateUpdated + ", DbId "+ modifierRows[i].DbId);
              }
              expect(modifierDateInUtcFormat).to.be.true;
            }
            
            });//Query Modifier table

            
         
    }) 
  
    })