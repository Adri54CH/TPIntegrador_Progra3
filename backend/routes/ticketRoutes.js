const express = require("express");

const ticketRouter = express.Router();

const ticketController = require("../controllers/ticketController");

//Endpoint para servir 'ticket.html'
ticketRouter.get("/",ticketController.mostrarTicket);

//Endppint para servir 'ticket.css'
ticketRouter.get("/css",ticketController.mostrarCssTicket);

//Endpoint para servir 'ticket.js'
ticketRouter.get("/js",ticketController.mostrarJsTicket);


module.exports = ticketRouter;