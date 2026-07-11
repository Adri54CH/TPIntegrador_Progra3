import express from 'express';

// importo el controlador de product 
import * as productController from '../controllers/productController.js';


const router = express.Router();


// Endpoint para mostrar los productos 
router.get("/",productController.obtenerProductos);

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


//Endpoint para agregar un usuario administrador

router.post("/usuarios",productController.crearUsuario);



// exporto el router 
export default router;

