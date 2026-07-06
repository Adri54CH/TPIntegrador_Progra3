const express = require("express");


const autenticacionRouter = express.Router();

const autenticacionController = require("../controllers/autenticacionController");



autenticacionRouter.get("/",autenticacionController.mostrarLoginCliente);

autenticacionRouter.get("/clientecss",autenticacionController.mostrarCssLoginCliente);

autenticacionRouter.get("/clientejs",autenticacionController.mostrarJsLoginCliente);

autenticacionRouter.get("/login/admin",autenticacionController.mostrarLogin);

autenticacionRouter.get("/login/admincss",autenticacionController.mostrarCssLogin);

autenticacionRouter.get("/login/adminjs",autenticacionController.mostrarJsLogin);

autenticacionRouter.post("/validarLogin",autenticacionController.validarLogin);








module.exports = autenticacionRouter;