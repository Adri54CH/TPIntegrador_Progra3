const express = require("express");

const routerCarrito = express.Router();

const carritoController = require("../controllers/carritoController");

//Endpoint para servir 'carrito.html'
routerCarrito.get("/",carritoController.mostrarCarrito);

//Endpoint para servir 'carrito.css'
routerCarrito.get("/css",carritoController.mostrarCssCarrito);

//Endpoint para servir 'carrito.js'
routerCarrito.get("/js",carritoController.mostrarJsCarrito);


module.exports = routerCarrito;