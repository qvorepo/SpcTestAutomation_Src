/// <reference types="Cypress" />
describe('Task Command', () => {
    /** 
     * Read the directory and search for files with specific file name.
     * Add the matched files to an array.
     * Search through each file in the array and look for a match string.
     * Add each count of the match string to a variable.
     * Each occurence of the match string should be found for every 6 hours.
     * Therefore, on any given day, the total count of the match string should not exceed 4.
     */
      it('Read Directory and search for a matched string in the files Test', () => {
  
        const currentDate=Cypress.moment().format('YYYY MM DD');
        const dirPath='C:/SPC/logs'
        const dateToSearch='20201025';
        //const Services_Health, Services_OrderRouter, Services_Gateway
        //const fileNamePrefix='Services_Health' + dateToSearch;
        const fileNamePrefix='Services_OrderRouter' +dateToSearch;
        const fileArr=new Array();
        const searchString='';
        //const searchString='\"103-ServiceChecker-8\"';
        let regExp = new RegExp(searchString, 'g');
  
        /**
         * errorCounts array has two dimensions.  
         * Each inner array has three columns:  error code, production count, and test count.
        */
      //  var errorCounts = [
      //   ['"103-ServiceChecker-8"', 115, 0],
      //   ['Device is unhealthy because:', 19899, 0],
      //   ['All critical services are healthy', 337, 0],
      //   ['"103-ServiceHealthCheckActor-3"', 19899,0]
      // ];//End errorCount
              
  
        var allFilesContent='Current date: ' + currentDate +'\n' + 'Log file date: ' + dateToSearch;
        cy.task('readDir', dirPath).then((resp) =>{
          for(var i=0; i<resp.length; i++)
          {
            if(resp[i].includes(fileNamePrefix)) 
            {
              const filePath=dirPath+'/'+ resp[i];
              cy.task('readFile', filePath).then((fileContent)=>{
  
                allFilesContent=allFilesContent+fileContent;
                //cy.log(allFilesContent.toString());
                cy.writeFile('./cypress/fixtures/CombinedFile.txt', allFilesContent );
                
              });
            }
  
          }
  
        });
           
  
      }) 
  
    })