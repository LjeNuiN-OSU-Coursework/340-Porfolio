// Citation for the following function:
// Date: 12/06/2021
// Based on: Nodejs starter app provided by class
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js



// Citation for the following function:
// Date: 12/02/2020
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: http://www.oregonstate.edu/mysource




// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_senars',
    password        : '6170',
    database        : 'cs340_senars'
})

// Export it for use in our applicaiton
module.exports.pool = pool;