
const path = require("path");

const mostrarCarrito = (req,res)=>
{
    res.sendFile(path.join(__dirname,"../../frontend/carrito.html"));
}

const mostrarCssCarrito = (req,res)=>
{
    res.sendFile(path.join(__dirname,"../../frontend/css/styles.css"));
}

const mostrarJsCarrito = (req,res)=>
{
    res.sendFile(path.join(__dirname,"../../frontend/js/carrito.js"));
}

module.exports = {
    mostrarCarrito,
    mostrarCssCarrito,
    mostrarJsCarrito
}