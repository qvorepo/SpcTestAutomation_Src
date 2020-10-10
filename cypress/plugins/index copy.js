/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)


/**
 * @type {Cypress.PluginConfig}
 */

const mysql = require('sqlite3')
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
   connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        // console.log(results)
        return resolve(results)
      }
    })
  })
}

module.exports = (on, config) => {
  // Usage: cy.task('queryDb', query)
  on('task', {
    queryDb: query => {
      return queryTestDb(query, config)
    },
  })
}
 

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches
    console.log(launchOptions.args) // print all current args

    // if (browser.family === 'chromium' && browser.name !== 'electron') {
    //   // auto open devtools
    //   launchOptions.args.push('--auto-open-devtools-for-tabs')

    //   // whatever you return here becomes the launchOptions
    //   return launchOptions
    // }

    if (browser.family === 'chrome') {
      // auto open devtools
      cy.log('Test browser launch preferences.')
      //launchOptions.args.push('--no-sandbox')

      return launchOptions
    }
  })
}
