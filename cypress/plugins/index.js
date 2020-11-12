/// <reference types="cypress" />
//index.js from the plugins folder

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const cucumber=require ('cypress-cucumber-preprocessor').default;
const findRemoveSync = require('find-remove');

module.exports = (on, _config) => {
    on('task', {
         print: log,
         readDir: lst,
         readFile: fileContent,
		 queryConfigDb: queryConfigDb,
		 querySpcDb: querySpcDb,
         copyLogDir: copyDirectory,
         purgeOldLogs:purgeOldLogs,
         
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
 * SQLite Database Connection to Configuration DB.
 */
const configDBPath='C:/SPC/Database/Configuration.db'
//const configDBPath=Cypress.env('configDb');
function queryConfigDb(sql) {
	let db = new sqlite3.Database(configDBPath);
	return new Promise((resolve, reject) => {
		db.all(sql, [], (err, rows) => {
		if(err) 
			reject(err); 

		else  {
		  db.close();
		  console.log(rows)
		  return resolve(rows);
		}//End else
		
	  });//End db.run

	});
}

/**
 * SQLite Database Connection to SPC DB.
 */
const spcDbPath='C:/SPC/Database/SPC.db'
function querySpcDb(sql) {
	let db = new sqlite3.Database(spcDbPath);
	return new Promise((resolve, reject) => {
		db.all(sql, [], (err, rows) => {
		if(err) 
			reject(err); 

		else  {
		  db.close();
		  console.log(rows)
		  return resolve(rows);
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

/**
 * Remove log files older than 14 days.
 * 1 hr:  3600 seconds
 */

function purgeOldLogs()
{
  var result = findRemoveSync('C:/SPC/logs', {age: {seconds: 1209600}, extensions: '.log'})
	  return result;
}

