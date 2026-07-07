const express = require("express");


const dashboardRouter = express.Router();

const dashboardController = require("../controllers/dashboardController");


//Endpoint para servir 'dashboard.ejs' hmtl generado desde el servidor 
dashboardRouter.get("/",dashboardController.mostrarDashboard);





// Exporto el router 'dashboardRouter'
module.exports = dashboardRouter;

