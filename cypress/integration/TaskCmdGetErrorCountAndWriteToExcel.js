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
      it('Read Directory and search for matched a match string in the files Test', () => {
        const currentDate=Cypress.moment().format('YYYY MM DD');
        const dirPath='C:/SPC/logs'
        const dateToSearch='20201023';
        const fileNamePrefix='Services_Health' + dateToSearch;
        const fileArr=new Array();
        //const searchString='\"103-ServiceChecker-8\"';
        const testStr='"103-ServiceChecker-8"'; // ['\"103-ServiceChecker-8\"', 115, 0],
        const searchString='';
        let regExp = new RegExp(searchString, 'g');
  
        /**
         * errorCounts array is has two dimensions.  
         * Each inner array has three columns:  error code, production count, and test count.
        */
        // var errorCounts = [
        //   ['"103-ServiceChecker-8"', 115, 0],
        //   ['Device is unhealthy because:', 19899, 0],
        //   ['All critical services are healthy', 337, 0],
        //   ['"103-ServiceHealthCheckActor-3"', 19899,0]
        // ];//End errorCount
  
        var errorCounts=[["\"108-RoutingCodes-14\"",3573108,0],["\"108-RoutingCodes-11-HttpStatusCode-204\"",2933345,0],["\"108-RoutingCodes-12\"",1570509,0],["\"108-HttpCommunicationCodes-1\"",860764,0],["\"108-RoutingCodes-15-HttpStatusCode-0\"",633846,0],["\"108-HeartbeatExtensions-1\"",144228,5759],["\"108-RoutingCodes-18\"",85381,0],["\"108-ServiceHealth-10\"",46542,0],["\"108-ControllerCodes-2\"",2244,1152],["\"108-ControllerCodes-1-HttpStatusCode-204\"",2101,0],["\"108-RoutingCodes-8\"",1196,0],["\"108-RoutingCodes-6\"",791,0],["\"108-ControllerCodes-5\"",771,0],["\"108-ConfigCodes-4\"",761,0],["\"108-LoadBalancingCodes-1\"",330,298],["\"108-ConfigCodes-1\"",257,0],["\"108-RoutingCodes-7\"",255,0],["\"108-ServiceStartup-10\"",220,0],["\"108-ServiceHealth-40\"",179,0],["\"108-ControllerCodes-8-HttpStatusCode-0\"",143,0],["\"108-ConfigCodes-6\"",140,1],["\"108-ServiceStartup-20\"",136,0],["\"108-ConfigCodes-9\"",116,0],["\"108-StatusCodes-2\"",112,1152],["\"108-ServiceStartup-40-TopshelfExitCode-0\"",98,0],["\"108-StatusCodes-1\"",94,1152],["\"108-HeartbeatExtensions-2\"",87,0],["\"108-ServiceStartup-30\"",85,0],["\"108-ServiceHealth-20\"",83,0],["\"108-HealthCheckCodes-2\"",82,0],["\"108-HealthCheckCodes-18\"",82,0],["\"108-HeartbeatExtensions-2\"",55,0],["\"108-ServiceStartup-30-TopshelfExitCode-0\"",39,0],["\"108-LogConfigurationExtensions-1\"",26,0],["\"108-HealthCheckCodes-4\"",25,0],["\"108-ConfigCodes-3\"",23,16],["\"108-ControllerCodes-10\"",22,0],["\"108-HealthCheckCodes-6\"",17,0],["\"108-ConfigCodes-2\"",8,2],["\"108-RoutingCodes-17\"",6,0],["\"108-HealthCheckCodes-8\"",5,0],["\"108-ServiceStartup-40-TopshelfExitCode-1243\"",4,0],["\"108-HealthCheckCodes-12\"",4,0],["\"108-RoutingCodes-15-HttpStatusCode-400\"",3,0],["\"108-ServiceStartup-40-TopshelfExitCode-1064\"",3,0],["\"108-HealthCheckCodes-14\"",3,0],["\"108-ServiceHealth-20\"",3,0],["\"108-RoutingCodes-3\"",2,0],["\"108-RoutingCodes-16\"",2,0],["\"108-ServiceHost-1\"",1,0],["\"108-ConfigCodes-10\"",1,1],["\"108-ServiceStartup-40\"",1,0]]

  
        cy.task('writeToExcel', errorCounts).then((resp) =>{
  
        });
           
  
      }) 
  
    })