const express = require("express");


const dashboardRouter = express.Router();

const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/",dashboardController.mostrarDashboard);





// Exporto el router 'dashboardRouter'
module.exports = dashboardRouter;

