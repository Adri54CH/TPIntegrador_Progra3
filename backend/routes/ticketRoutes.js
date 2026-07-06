const express = require("express");

const ticketRouter = express.Router();

const ticketController = require("../controllers/ticketController");


ticketRouter.get("/",ticketController.mostrarTicket);
ticketRouter.get("/css",ticketController.mostrarCssTicket);
module.exports = ticketRouter;