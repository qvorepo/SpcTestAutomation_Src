/// <reference types="Cypress" />
describe('Task Command', () => {
    /** 
     * Read the given file.
     * Count the error codes matching the error codes in the input array.
     */
      it('Get error count matching the error codes in the input array.', () => {
        //Services_OrderRouter, Services_Gateway, Services_Health
        const currentDate=Cypress.moment().format('YYYY MM DD');
        const dirPath='C:/SPC/logs'
        const dateToSearch='20201025';
        const fileNamePrefix='Services_OrderRouter' + dateToSearch;
        const fileArr=new Array();
        //const searchString='\"103-ServiceChecker-8\"';
        const searchString='';
        let regExp = new RegExp(searchString, 'g');
  
        /**
         * errorCounts array is has two dimensions.  
         * Each inner array has three columns:  error code, production count, and test count.
        */
        var errorCounts = [
          
          ['"108-RoutingCodes-14"', 3573108, 0],
['"108-RoutingCodes-11-HttpStatusCode-204"', 2933345, 0],
['"108-RoutingCodes-12"', 1570509, 0],
['"108-HttpCommunicationCodes-1"', 860764, 0],
['"108-RoutingCodes-15-HttpStatusCode-0"', 633846, 0],
['"108-HeartbeatExtensions-1"', 144228, 0],
['"108-RoutingCodes-18"', 85381, 0],
['"108-ServiceHealth-10"', 46542, 0],
['"108-ControllerCodes-2"', 2244, 0],
['"108-ControllerCodes-1-HttpStatusCode-204"', 2101, 0],
['"108-RoutingCodes-8"', 1196, 0],
['"108-RoutingCodes-6"', 791, 0],
['"108-ControllerCodes-5"', 771, 0],
['"108-ConfigCodes-4"', 761, 0],
['"108-LoadBalancingCodes-1"', 330, 0],
['"108-ConfigCodes-1"', 257, 0],
['"108-RoutingCodes-7"', 255, 0],
['"108-ServiceStartup-10"', 220, 0],
['"108-ServiceHealth-40"', 179, 0],
['"108-ControllerCodes-8-HttpStatusCode-0"', 143, 0],
['"108-ConfigCodes-6"', 140, 0],
['"108-ServiceStartup-20"', 136, 0],
['"108-ConfigCodes-9"', 116, 0],
['"108-StatusCodes-2"', 112, 0],
['"108-ServiceStartup-40-TopshelfExitCode-0"', 98, 0],
['"108-StatusCodes-1"', 94, 0],
['"108-HeartbeatExtensions-2"', 87, 0],
['"108-ServiceStartup-30"', 85, 0],
['"108-ServiceHealth-20"', 83, 0],
['"108-HealthCheckCodes-2"', 82, 0],
['"108-HealthCheckCodes-18"', 82, 0],
['"108-HeartbeatExtensions-2"', 55, 0],
['"108-ServiceStartup-30-TopshelfExitCode-0"', 39, 0],
['"108-LogConfigurationExtensions-1"', 26, 0],
['"108-HealthCheckCodes-4"', 25, 0],
['"108-ConfigCodes-3"', 23, 0],
['"108-ControllerCodes-10"', 22, 0],
['"108-HealthCheckCodes-6"', 17, 0],
['"108-ConfigCodes-2"', 8, 0],
['"108-RoutingCodes-17"', 6, 0],
['"108-HealthCheckCodes-8"', 5, 0],
['"108-ServiceStartup-40-TopshelfExitCode-1243"', 4, 0],
['"108-HealthCheckCodes-12"', 4, 0],
['"108-RoutingCodes-15-HttpStatusCode-400"', 3, 0],
['"108-ServiceStartup-40-TopshelfExitCode-1064"', 3, 0],
['"108-HealthCheckCodes-14"', 3, 0],
['"108-ServiceHealth-20"', 3, 0],
['"108-RoutingCodes-3"', 2, 0],
['"108-RoutingCodes-16"', 2, 0],
['"108-ServiceHost-1"', 1, 0],
['"108-ConfigCodes-10"', 1, 0],
['"108-ServiceStartup-40"', 1, 0]

          
          
        ];//End errorCount
              
        //var file1='C:/SPC/logs/Services_Health_CombinedContents.log'
        var file2='./cypress/fixtures/CombinedFile.txt';
        cy.readFile(file2).then((output)=>{
  
          const searchString='';
          let regExp = new RegExp(searchString, 'g');
          var countOfSearchString=0;
          errorCounts.forEach((errorCount, index)=>{
  
            //cy.log('index ' + index + errorCount);
            //cy.log('index ' + index + ' searchString ' + errorCount[0] + " count before search "+ errorCount[2]);
            regExp=new RegExp(errorCount[0], 'g');
            let count = (output.match(regExp) || []).length;
            //countOfSearchString=countOfSearchString+ count;
            errorCount[2]=count;
            cy.log('index ' + index + ' searchString ' +  errorCount[0] + " count after search "+ errorCount[2]);
            
          })//forEach errorCounts
          cy.writeFile('./cypress/fixtures/errorCount.txt', JSON.stringify(errorCounts) )   ;
  
        });
           
  
      }) 
  
    })