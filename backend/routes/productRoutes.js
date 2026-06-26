const express = require("express");


const router = express.Router();

const productController = require("../controllers/productController");

// Endpoint para mostrar los productos 
router.get("/productos",productController.obtenerProductos);

// Endpoint para agregar un producto
router.post("/agregarProducto",productController.agregarProducto);

// Endpoint para eliminar un producto
router.post("/eliminarProducto/:id",productController.eliminarProducto);

//Endpoint para editar un producto 

router.put("/editarProducto/:id",productController.editarProducto);

// Endpoint para dar de alta un producto 

router.put("/activarProducto/:idProducto",productController.activarProducto);















module.exports = router;

