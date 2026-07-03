// importo 'pool' del archivo de configuracion
const pool = require("../config/db");


const validarLogin = async(correo)=>{

    const [filas] = await pool.query("SELECT * FROM usuarios WHERE correo = ?",[correo]);

    return filas[0];



}


module.exports = {
    validarLogin
}
