const autenticacionModel = require("../models/autenticacionModel");


const validarLogin = async(req,res)=>{

    const datos = req.body;
    const {email,contrasena} = datos;

    const usuario = await autenticacionModel.validarLogin(email,contrasena);

    if(!usuario){ 
        // uso de return para terminar la funcion 
        return res.json({salida:false,mensaje:"usuario no valido"})
    }

    return res.json({salida:true,mensaje:"el usuario es valido"})


}


module.exports = {
    validarLogin
}