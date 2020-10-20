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
        const currentDate=Cypress.moment().format('YYYYMMDD').toString();//20201020
        //Services_Health, Services_Gateway, Services_InstoreApi, Services_PrintManager
        cy.log('Current date ' +currentDate);
        const dirPath='C:/SPC/logs'
        const fileNamePrefix='Services_Health' + currentDate;
        const fileArr=new Array();
        const searchString='103-ServiceChecker-8';
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
              cy.task('readFile', filePath).then((fileContent)=>{
                //let count = (fileContent.match(/103-ServiceChecker-8/g) || []).length;
                let count = (fileContent.match(regExp) || []).length;
                countOfSearchString=countOfSearchString+ count;
                if(index<(fileArr.length-1))
                {
                    cy.log('index ' + index+ ', Count of search string \'' + searchString + '\' is ' + countOfSearchString);
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
  