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
      it('Read directory and search for a matched string in the files test, failed if count greater than 4', () => {
        const currentDate=Cypress.moment().format('MM/DD/YYYY').toString();//20201020
        //Services_Health, Services_Gateway, Services_InstoreApi, Services_PrintManager, Services_OrderRouter
        const dateToSearch='20201105';
        cy.log('Current date ' +currentDate);
        cy.log('Date to search ' +dateToSearch) 
        const dirPath='C:/SPC/logs'
         //const fileNamePrefix='Services_Health' + dateToSearch;
         //const searchString='"All critical services are healthy and sending a unified heartbeat."';// Client health 103-ServiceChecker-8
         const searchString='108-ConfigCodes-4'
         const serviceName='Services_OrderRouter';
         const fileNamePrefix=serviceName + dateToSearch;
         cy.log("Search string " +searchString)

         
        // const searchString='101-IotHubClient-15';//Gateway

        // const fileNamePrefix='Services_InstoreApi' + dateToSearch;
        // const searchString='101-04-HeartbeatExtensions-1';//Instore        

        // const fileNamePrefix='Services_OrderRouter' + dateToSearch;
        // const searchString='\"108-StatusCodes-2\"';//Order Router       

        //109-PrintManagerCodes-37


        const fileArr=new Array();
        
        //const searchString='109-PrintManagerCodes-37';
        
        let regExp = new RegExp(searchString, 'g');
        cy.log('File name prefix ' + fileNamePrefix);
              
        
        //const dirPath='C:/Users/Mamga/Projects/CypressAutomationPractice'
        cy.task('readDir', dirPath).then((resp) =>{
          console.log(resp);
          if(resp.length>0)
          {
            cy.log('Files and subdirectories in ' + dirPath);
            for (var i=0; i<resp.length; i++)
            {
              if(resp[i].includes(fileNamePrefix)){
                fileArr.push(resp[i]);
                //cy.log('File name ' + resp[i] + " is in index " + i)
                
              }
              
            }
            cy.log('There are ' + fileArr.length + " log files in the " + dirPath + ' directory.')
  
            var countOfSearchString=0;
            fileArr.forEach(($el, index, $list)=>{
              const filePath=dirPath+'/'+ fileArr[index];
              cy.log('')
              cy.task('readFile', filePath).then((fileContent)=>{
                //let count = (fileContent.match(/103-ServiceChecker-8/g) || []).length;
                let count = (fileContent.match(regExp) || []).length;
                countOfSearchString=countOfSearchString+ count;
                if(index<(fileArr.length-1))
                {
                    cy.log('index ' + index +" file name " + filePath + ', Count of search string \'' + searchString + '\' is ' + countOfSearchString);
                }
                
  
  
                if(index==(fileArr.length-1))
                {
                  cy.log('index ' + index +', Count of search string \'' + searchString + '\' is ' + countOfSearchString);
  
                  expect(countOfSearchString).to.be.lessThan(5);
                }
              });
            });  
            
          }
  
        });
           
  
      }) 
  
    })
  