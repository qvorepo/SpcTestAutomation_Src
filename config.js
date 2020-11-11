const cypress=require('cypress');
const fse=require('fs-extra');
const {merge}= require('mochawesome-merge');
const generate=require('mochawesome-report-generator');
const { options } = require('yargs');

async function runTests(){
    await fse.emptyDir('mochawesome-report');
    const {totalFailed} = await cypress.run({
      spec: 'cypress/integration/SwitchCurbsideChannelStateTest.js,cypress/integration/CurbsideBackupPrinters_spec.js,cypress/integration/API_SubmitCurbsideArrivalMessageTest.js,cypress/integration/changeRoutingTemplates.feature,cypress/integration/LabelPrintTest.js, cypress/integration/purgeOldLogs.spec.js,cypress/integration/OldOrderRemovalTest.spec.js',
        config: 'video=false'
      });
    const jsonReport = await merge();
    await generate.create(jsonReport, {inline:true});
    process.exit(totalFailed)

}
runTests();
