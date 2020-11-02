/// <reference types="Cypress" />
describe('Task Command', () => {
    /** 
     * Read the directory and search for files with specific file name.
     * Add the matched files to an array.
     * Search through each file in the array and look for a match string.
     * Add each count of the match string to a variable.
     * 1246 per day, not certain why.
     */
      it('Read directory and search for a matched string in the files test, failed if not equal 1246 for the whole day.', () => {
        const currentDate=Cypress.moment().format('YYYYMMDD').toString();//20201020
        //Services_Health, Services_Gateway, Services_InstoreApi, Services_PrintManager, Services_OrderRouter
        const dateToSearch=currentDate;
        //const dateToSearch='20201029';
        cy.log('Current date ' +Cypress.moment().format('MM/DD/YYYY').toString());
        cy.log('Date to search ' +dateToSearch) 
        const dirPath='C:/SPC/logs'
         //const fileNamePrefix='Services_Health' + dateToSearch;
         //const searchString='"All critical services are healthy and sending a unified heartbeat."';// Client health 103-ServiceChecker-8
         const searchString='\"Received {@IotHubMessage} from Iot Hub.\"';
         const serviceName='Services_Gateway';
         const fileNamePrefix=serviceName + dateToSearch;
         cy.log("Search string " +searchString)

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
  
                  expect(countOfSearchString).to.be.equal(1246);// Not certain why 1246.
                }
              });
            });  
            
          }
  
        });
           
  
      }) 
  
    })
  