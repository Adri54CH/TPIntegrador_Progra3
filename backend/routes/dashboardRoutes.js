const express = require("express");


const dashboardRouter = express.Router();

const dashboardController = require("../controllers/dashboardController");

// 'Se define el controlador para este grupo rutas '
dashboardRouter.get("/",dashboardController.mostrarDashboard);





// Exporto el router 'dashboardRouter'
module.exports = dashboardRouter;

