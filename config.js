const cypress=require('cypress');
const fse=require('fs-extra');
const {merge}= require('mochawesome-merge');
const generate=require('mochawesome-report-generator');
const { options } = require('yargs');

async function runTests(){
    await fse.emptyDir('mochawesome-report');
    const {totalFailed} = await cypress.run({
      spec: 'cypress/integration/testCases/*,cypress/integration/RoutingTemplates.feature',
        config: 'video=false'
      });
    const jsonReport = await merge();
    await generate.create(jsonReport, {inline:true});
    process.exit(totalFailed)

}
runTests();
