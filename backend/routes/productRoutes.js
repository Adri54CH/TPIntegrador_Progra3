const express = require("express");


const productRouter = express.Router();

const productController = require("../controllers/productController");


productRouter.get("/",productController.mostrarProductos);
productRouter.get("/css",productController.mostrarCssProductos);
productRouter.get("/js",productController.mostrarJsProductos);



module.exports = productRouter;

