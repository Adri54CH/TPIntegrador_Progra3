// importo todas las funciones de 'autenticacionModel'
import * as autenticacionModel from '../models/autenticacionModel.js'

const validarLogin = async(req,res)=>{

    const datos = req.body;
    const {email,contrasena} = datos;

    try{
        const usuario = await autenticacionModel.validarLogin(email,contrasena);
    
        // Si el usuario no existe en la base de datos 
        if(!usuario){ 
            return res.json({salida:false,mensaje:"usuario no valido"});
        }
    
        return res.json({salida:true,mensaje:"el usuario es valido"});
        
    }
    // Si la operacion a la consulta de datos falla , promesa rechazada 
    catch(error){

        console.log(error);
        return res.status(500).json({salida:false,mensaje:"Error interno del servidor"});

        
    }


}


export {
    validarLogin
}