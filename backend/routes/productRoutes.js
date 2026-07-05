const express = require("express");


const productRouter = express.Router();

const productController = require("../controllers/productController");


productRouter.get("/",productController.mostrarProductos);

module.exports = productRouter;

