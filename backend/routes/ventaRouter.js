const express = require("express");

const ventaRouter = express.Router();

const ventaController = require("../controllers/ventaController");

//Endpoint para registrar ventas 
ventaRouter.post("/ventas",ventaController.registrarVenta);

//Endpoint para obtener una venta por id 
ventaRouter.get("/ventas/:id",ventaController.mostrarVenta);


module.exports = ventaRouter;