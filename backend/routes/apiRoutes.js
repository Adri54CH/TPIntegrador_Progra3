const express = require("express");


const router = express.Router();

const apiController = require("../controllers/apiController");

// Endpoint para mostrar los productos 
router.get("/productos",apiController.obtenerProductos);

// Endpoint para agregar un producto
router.post("/agregarProducto",apiController.agregarProducto);

// Endpoint para eliminar un producto
router.delete("/eliminarProducto/:id",apiController.eliminarProducto);

//Endpoint para editar un producto 

router.put("/editarProducto/:id",apiController.editarProducto);

// Endpoint para dar de alta un producto 

router.put("/activarProducto/:idProducto",apiController.activarProducto);

// Endpoint para obtener un producto por su ID

router.get("/producto/:id",apiController.obtenerProducto);

//Endpoint para registrar ventas 

router.post("/ventas",apiController.registrarVenta);


module.exports = router;

