/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'

describe('File Read Sample Test', () => {
  it('File Read Sample Test', () => {

    //const homePage=new HomePage();


    
    cy.readFile('C:/SPC/ClientData/channel_state_data_config.json').then((json) => {
      cy.log('Contents of json ' + json)
      expect(json[0]).to.have.any.keys('IsActive');
      expect(json[0]).to.be.an('object');
      expect(json[0].IsActive).to.be.true;
    });//End read file


  });

});