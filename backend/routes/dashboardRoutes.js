import express from 'express';

//Importo el controlador del dashboard 
import * as dashboardController from '../controllers/dashboardController.js';

// importo el middleware para validar la sesion
import { verificarSesion } from '../middlewares/autenticacionMiddleware.js';


// Creo una instancia de Router 
const dashboardRouter = express.Router();

//Endpoint para servir 'dashboard.ejs' hmtl generado desde el servidor , 
// con un middleware de ruta para validar que la sesion exista 
dashboardRouter.get("/",verificarSesion,dashboardController.mostrarDashboard);




// Exporto el router 'dashboardRouter'
export default dashboardRouter;

