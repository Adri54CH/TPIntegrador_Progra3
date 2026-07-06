const autenticacionModel = require("../models/autenticacionModel");

const path = require("path");

const mostrarLoginCliente = (req,res)=>{
    
    res.sendFile(path.join(__dirname,"../../frontend/login-cliente.html"));


}

const mostrarLogin = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/login-admin.html")); 


}

const mostrarCssLogin = (req,res)=>{


    res.sendFile(path.join(__dirname,"../../frontend/css/login-admin.css"));


}

const mostrarJsLogin = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/js/login-admin.js"));

}


const validarLogin = async(req,res)=>{

    const datos = req.body;
    const {email,contrasena} = datos;

    const usuario = await autenticacionModel.validarLogin(email);

    if(!usuario){ 
        // uso de return para terminar la funcion 
        return res.json({mensaje:"usuario no valido"})
    }

    // verifico que la contraseña coincida
    if(usuario.contrasena === contrasena){

        return res.json({mensaje: "usuario valido"});


    }

    return res.json({mensaje:"contraseña incorrecta"});




}


const mostrarCssLoginCliente = (req,res)=>{
    
    res.sendFile(path.join(__dirname,"../../frontend/css/login-cliente.css"));
}

const mostrarJsLoginCliente = (req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/js/login-cliente.js"));

}
module.exports = {
    mostrarLoginCliente,
    mostrarLogin,
    mostrarCssLogin,
    mostrarJsLogin,
    validarLogin,
    mostrarCssLoginCliente,
    mostrarJsLoginCliente
}