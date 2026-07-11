
// Archivo de configuracion 'db'

//Importo el modulo de mysql que trabaja con promesas 
import mysql from 'mysql2/promise';

// Hago uso de las variables de entorno previamente cargadas y 
// creamos un pool de conexiones con referencia a mi base de datos 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Exporto el pool 
export default pool;


