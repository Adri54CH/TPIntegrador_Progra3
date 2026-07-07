const express = require("express");


const router = express.Router();

const productController = require("../controllers/productController");

// Endpoint para mostrar los productos 
router.get("/productos",productController.obtenerProductos);

// Endpoint para agregar un producto
router.post("/agregarProducto",productController.agregarProducto);

// Endpoint para eliminar un producto
router.delete("/eliminarProducto/:id",productController.eliminarProducto);

//Endpoint para editar un producto 

router.put("/editarProducto/:id",productController.editarProducto);

// Endpoint para dar de alta un producto 

router.put("/activarProducto/:idProducto",productController.activarProducto);

// Endpoint para obtener un producto por su ID

router.get("/producto/:id",productController.obtenerProducto);

// Endpoint para devolver 'productos.hmtl'
productRouter.get("/",productController.mostrarProductos);

// Endopoint para servir 'productos.css'
productRouter.get("/css",productController.mostrarCssProductos);

//Endpoint para servir 'productos.css'
productRouter.get("/js",productController.mostrarJsProductos);





//Endpoint para agregar un usuario administrador

router.post("/usuarios",productController.crearUsuario);




module.exports = router;

