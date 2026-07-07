// importo 'pool' del archivo de configuracion
const pool = require("../config/db");

const bcrypt = require("bcrypt");


const validarLogin = async(correo,password)=>{

    const [filas] = await pool.query("SELECT * FROM usuarios WHERE correo = ?",[correo]);

    if(filas.length === 0){
        
        return null;
    }

    const usuario = filas[0];

    const passwordValida = await bcrypt.compare(password,usuario.contrasena);

    if(!passwordValida){
        
        return null; // contraseña incorrecta
    }

    return usuario;



}


module.exports = {
    validarLogin
}
