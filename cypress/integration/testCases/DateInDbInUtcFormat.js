/// <reference types="Cypress" />
/**
 * Connect to the SPC.db database
 * Query the Orders, OrderItems, and Modifiers table.
 * Verify the dates are in Utc Format By Containing 'T'
 */
describe('Date In Database in Utc Format Test', () => {
    it('Date/Time In Database in Utc Format Test', () => {
      var orderDateInGoodFormat=true;
      var itemDateInGoodFormat=true;
      var modifierDateInGoodFormat=true;
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

       
        for(var i=0; i<rows.length; i++)
        {
          
          if(!rows[i].DateUpdated.includes('T') && !rows[i].DateCreated.includes('Z'))
          {
            orderDateInGoodFormat=false;
            cy.log('Old Order ' + rows[i].DateCreated + ", DbId "+ rows[i].DbId);
          }
          expect(orderDateInGoodFormat).to.be.true;
        }
        
        });//Query Orders table

        cy.task('querySpcDb', itemsQuery).then((itemRows) => {

          for(var i=0; i<itemRows.length; i++)
          {
             diff = currentDate.valueOf() -(Cypress.moment(itemRows[i].DateUpdated).utc().valueOf());
             diffInHours=diff/1000/60/60; // Convert milliseconds to hours
            cy.log('diffInHours '+ diffInHours);
            if(!itemRows[i].DateUpdated.includes('T') && !itemRows[i].DateUpdated.includes('Z'))
            {
              itemDateInGoodFormat=false;
              cy.log('Old Item ' + itemRows[i].DateUpdated + ", DbId "+ itemRows[i].DbId);
            }
            expect(itemDateInGoodFormat).to.be.true;
          }
          
          });//Query OrderItems table

          cy.task('querySpcDb', modifiersQuery).then((modifierRows) => {
           
            for(var i=0; i<modifierRows.length; i++)
            {
            if(!modifierRows[i].DateUpdated.includes('T') && !modifierRows[i].DateUpdated.includes('Z'))
              {
                modifierDateInGoodFormat=false;
                cy.log('Old Modifier ' + modifierRows[i].DateUpdated + ", DbId "+ modifierRows[i].DbId);
              }
              expect(modifierDateInGoodFormat).to.be.true;
            }
            
            });//Query Modifier table

            
         
    }) 
  
    })