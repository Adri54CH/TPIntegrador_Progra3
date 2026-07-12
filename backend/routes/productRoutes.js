import express from 'express';

// importo el controlador de product 
import * as productController from '../controllers/productController.js';

//importo el middleware upload para usarlo en rutas especificas 
import upload from '../config/multer.js';

const router = express.Router();


// Endpoint para mostrar los productos 
router.get("/",productController.obtenerProductos);

// Endpoint para agregar un producto
router.post("/agregarProducto",upload.single("imagen"),productController.agregarProducto);

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


//Endpoint para generar un excel con los productos

router.get("/excel",productController.generarExcelProductos);

// exporto el router 
export default router;

