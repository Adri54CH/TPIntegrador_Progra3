import express from 'express';

// importo el controlador de autenticacion
import * as autenticacionController from '../controllers/autenticacionController.js';

const autenticacionRouter = express.Router();



//Endpoint para validar el login
autenticacionRouter.post("/validarLogin",autenticacionController.validarLogin);


// exporto el router autenticacionRouter 
export default autenticacionRouter; 
