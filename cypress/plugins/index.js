/// <reference types="cypress" />
//index.js from the plugins folder

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const cucumber=require ('cypress-cucumber-preprocessor').default;

module.exports = (on, _config) => {
    on('task', {
         print: log,
         readDir: lst,
         readFile: fileContent,
         queryDb: queryTestDb,
		 copyLogDir: copyDirectory,
         
         //wait: timeout,
    });
    on('file:preprocessor', cucumber ());
};

/** Console log */
const log = (message) => {
    console.log(message);
    return 'OK';
};

// const timeout = (timeout) => {
//     return wait(timeout);
// };

/** Read directories */
const lst = (path) => {
    return fs.readdirSync(path);
};

/** Read files */
const fileContent = (path) => {
    return fs.readFileSync(path, 'utf8');
};

/**
 * SQLite Database Connection
 */
const path='C:/Users/Mamga/TestDB/chinook.db'
function queryTestDb(query) {
    let db = new sqlite3.Database(path);
    return new Promise((resolve, reject) => {
      db.run(query, (error, results) => {
        if(error) 
            reject(error); 

        else  {
          db.close();
          console.log(results)
          return resolve(results);
        }//End else
        
      });//End db.run

    });
}

/**
 * Copy a directory
 */
var copydir = require('copy-dir');
function copyDirectory()
{
	copydir.sync('C:/SPC/logs', 'C:/Logs_Copy/logs', {
		utimes: true,  // keep add time and modify time
		mode: true,    // keep file mode
		cover: true    // cover file when exists, default is true
	  });
	  return 'OK'
}





// const wit = (timeout) => {
//     return new Promise((res) => {
//         setTimeout(() => {
//             res(null);
//         }, timeout);
//     });
// };
