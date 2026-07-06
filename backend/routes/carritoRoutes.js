const express = require("express");

const routerCarrito = express.Router();

const carritoController = require("../controllers/carritoController");

// Endpoint para mostrar la vista del carrito 
routerCarrito.get("/",carritoController.mostrarCarrito);
routerCarrito.get("/css",carritoController.mostrarCssCarrito);
routerCarrito.get("/js",carritoController.mostrarJsCarrito);


module.exports = routerCarrito;