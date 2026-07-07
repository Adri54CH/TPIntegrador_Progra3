const express = require("express");


const autenticacionRouter = express.Router();

const autenticacionController = require("../controllers/autenticacionController");


// Endpoint para servir 'login-cliente.html'
autenticacionRouter.get("/",autenticacionController.mostrarLoginCliente);

//Endpoint para servir 'login-cliente.css'
autenticacionRouter.get("/clientecss",autenticacionController.mostrarCssLoginCliente);

//Endpoint para servir 'login-cliente.jss'
autenticacionRouter.get("/clientejs",autenticacionController.mostrarJsLoginCliente);

//Endpoint para servir 'login-admin.html'
autenticacionRouter.get("/login/admin",autenticacionController.mostrarLogin);

//Endpoint para servir 'login-admin.css'
autenticacionRouter.get("/login/admincss",autenticacionController.mostrarCssLogin);

//Endpoint para servir 'login-admin.js'
autenticacionRouter.get("/login/adminjs",autenticacionController.mostrarJsLogin);

//Endpoint para validar el login
autenticacionRouter.post("/validarLogin",autenticacionController.validarLogin);



module.exports = autenticacionRouter;