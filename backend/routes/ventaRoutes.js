import express from 'express';

// importo el controlador de venta 
import * as ventaController from '../controllers/ventaController.js';

const ventaRouter = express.Router();


//Endpoint para registrar ventas 
ventaRouter.post("/",ventaController.registrarVenta);

//Endpoint para obtener una venta por id 
ventaRouter.get("/:id",ventaController.mostrarVenta);

// exporto el router 'ventaRouter'
export default ventaRouter;
