const express = require("express");

const ventaRouter = express.Router();

const ventaController = require("../controllers/ventaController");

//Endpoint para registrar ventas 
ventaRouter.post("/",ventaController.registrarVenta);

//Endpoint para obtener una venta por id 
ventaRouter.get("/:id",ventaController.mostrarVenta);


module.exports = ventaRouter;