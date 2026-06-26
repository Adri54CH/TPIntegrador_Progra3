const express = require("express");


const autenticacionRouter = express.Router();

const autenticacionController = require("../controllers/autenticacionController");



autenticacionRouter.get("/",autenticacionController.mostrarLogin);

autenticacionRouter.get("/logincss",autenticacionController.mostrarCssLogin);

autenticacionRouter.get("/loginjs",autenticacionController.mostrarJsLogin);

autenticacionRouter.post("/validarLogin",autenticacionController.validarLogin);



module.exports = autenticacionRouter;