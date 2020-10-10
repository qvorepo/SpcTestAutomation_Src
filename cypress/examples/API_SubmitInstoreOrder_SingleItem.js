/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'

describe('Submit Cafe Order Single Item Test', () => {
  it('Submit Cafe Order Single Item Test', () => {

    const homePage=new HomePage();
    const storeNbr=722;
    const endPoint='https://localhost:9000/spc/api/v1/order/receive';
    const method='PUT';
    
    const uuid = () => Cypress._.random(0, 1e6);
    const orderGuid= uuid();  
    cy.log('orderGuid ' + orderGuid)
    const name='Quang';
    const currentDateTime=Cypress.moment().toISOString();
    
    const orderId=Cypress._.random(100001, 999999)
    cy.log('orderId ' + orderId);
    cy.log('Name combined ' + name + "-" + orderId);
	  const channelName="usrg01ct000722";
	  const channelType="cafe";
    const body= {
	"items": [
		{
			"id": 41,
			"quantity": 1,
			"Name1": "Tl Latte",
			"categoryId": 6,
			"ChildItems": []
		},
		{
			"id": 11054347,
			"quantity": 1,
			"Name1": "Plain Bagel",
			"categoryId": 7,
			"ChildItems": [
				{
					"id": 204198,
					"quantity": 1,
					"Name1": "Warmed",
					"categoryId": 2,
					"ChildItems": null
				}
			]
		}
	],
	"OrderGuid": orderGuid,
	"OrderID": orderId,
	"OrderToken": null,
	"LocationID": "722",
	"ChannelName": channelName,
	"ChannelType": channelType,
	"Customer": {"Name": name + "-" + orderId},
	"OrderSubmitDateTimeOffset": currentDateTime,
	"IsOrderToGo": true

      
    }//end BODY json

  cy.request(method,endPoint,body)
  .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(200)
  });

 



  }) 

})