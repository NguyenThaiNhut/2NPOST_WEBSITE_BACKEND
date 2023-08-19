const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('data_sequelize', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;





// get the client
// const mysql = require('mysql2');
// import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'hocnodejs'
// });

// Create the connection pool. The pool-specific settings are the defaults
// console.log("Create the connection pool");
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'hocnodejs',
// });

// let connectDB = async () => {
//     try {
//         await mysql2.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// simple query
// connection.query(
//     'SELECT * FROM `users` ',
//     function (err, results, fields) {
//         console.log(">>> check mysql")
//         console.log(results[0]); // results contains rows returned by server
//     }
// );

// export default pool;
