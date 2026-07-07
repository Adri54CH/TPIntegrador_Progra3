const express = require("express");


const autenticacionRouter = express.Router();

const autenticacionController = require("../controllers/autenticacionController");


//Endpoint para validar el login
autenticacionRouter.post("/validarLogin",autenticacionController.validarLogin);



module.exports = autenticacionRouter;