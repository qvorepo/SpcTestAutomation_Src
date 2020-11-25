class HomePage
{
    getPeakRadioBtn()
    {
        return cy.get('.container .row:nth-child(2) label.switch');
    }

    getOffPeakRadioBtn()
    {
        return cy.get('.container .row:nth-child(3) label.switch');
    }

    getLunchRadioBtn()
    {
        return cy.get('.container .row:nth-child(4) label.switch');
    }

    getPeakRouteMessage()
    {
        return cy.get('.container .row:nth-child(2) .route-message');
    }

    getOffPeakRouteMessage()
    {
        return cy.get('.container .row:nth-child(3) .route-message');
    }

    getLunchRouteMessage()
    {
        return cy.get('.container .row:nth-child(4) .route-message');
    }

    getAlertSuccessBox()
    {
        return cy.get('.alert-success');
    }

    //Curbside channels
    getCurbsideState()
    {
        return cy.get('.state');
    }

    getCurbsideEditButton()
    {
        return cy.get('button').contains('Edit');
    }

    getCurbsideSwitchButton()
    {
        return cy.get('.modal-body').find('label.switch');
    }

    getCurbsideSaveButton()
    {
        return cy.get('button').contains('Save');
    }
 

    //Printers
    getPrinter()
    {
        return cy.get('a.test-print');
    }

    getTestPrintAll()
    {
        return cy.get('.btn-primary').contains('Test Print All');
    }

}
export default HomePage;