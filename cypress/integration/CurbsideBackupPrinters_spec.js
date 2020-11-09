/// <reference types="Cypress" />
/**
 * Query the Configuration.db database
 * Verify the Curbside primary printer is Bar2 and backup printers is Bar1 then Warming1
 */
describe('Curbside Backup Printer Validation', () => {
    it('Curbside Backup Printer Test', () => {
      const query='SELECT PrinterSets.Name ,PrinterSets.DisplayName,PrimaryPrinter.Name AS PrimaryPrinterName,GROUP_CONCAT(PrinterSetLinks.PriorityOrder ||'+ "':'" + '|| LinkedPrinter.Name) AS BackupPrinterNames FROM PrinterSets JOIN PrinterSetLinks ON PrinterSets.PrinterSetId = PrinterSetLinks.PrinterSetId JOIN PrinterLinks ON PrinterSetLinks.PrinterLinkId = PrinterLinks.PrinterLinkId JOIN Printers AS PrimaryPrinter ON PrinterLinks.PrimaryPrinterId = PrimaryPrinter.PrinterId JOIN Printers AS LinkedPrinter ON PrinterLinks.LinkedPrinterId = LinkedPrinter.PrinterId GROUP BY PrimaryPrinter.PrinterId ORDER BY PrinterSetLinks.PriorityOrder ASC;'
      cy.task('queryConfigDb', query).then((rows) => {
        expect(rows).to.have.lengthOf(1);
       
        for(var i=0; i<rows.length; i++)
        {
          cy.log('Name: ' + rows[i].Name + ", DisplayName: "+ rows[i].DisplayName + ", PrimaryPrinterName: " + rows[i].PrimaryPrinterName+", BackupPrinterNames: " +rows[i].BackupPrinterNames)
          expect(rows[i].Name).to.equal('Curbside');
          expect(rows[i].DisplayName).to.equal('Curbside');
          expect(rows[i].PrimaryPrinterName).to.equal('Bar2');
          expect(rows[i].BackupPrinterNames).to.equal('0:Bar1,1:Warming1');

        }
        
        });
         
    }) 
  
    })