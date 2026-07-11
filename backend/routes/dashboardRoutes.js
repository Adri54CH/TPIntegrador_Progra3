import express from 'express';

//Importo el controlador del dashboard 
import * as dashboardController from '../controllers/dashboardController.js';

// Creo una instancia de Router 
const dashboardRouter = express.Router();

//Endpoint para servir 'dashboard.ejs' hmtl generado desde el servidor 
dashboardRouter.get("/",dashboardController.mostrarDashboard);



// Exporto el router 'dashboardRouter'
export default dashboardRouter;

