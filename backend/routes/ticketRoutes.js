const express = require("express");

const ticketRouter = express.Router();

const ticketController = require("../controllers/ticketController");


ticketRouter.get("/",ticketController.mostrarTicket);
ticketRouter.get("/css",ticketController.mostrarCssTicket);
ticketRouter.get("/js",ticketController.mostrarJsTicket);


module.exports = ticketRouter;