
// Archivo de configuracion 'db'

const mysql = require("mysql2/promise");


const pool = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "1234",
    database: "autoservicio"
});


// Exporto el pool 
module.exports = pool;

