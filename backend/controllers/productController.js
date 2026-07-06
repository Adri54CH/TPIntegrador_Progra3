const path = require("path");


const mostrarProductos = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/productos.html"));

}

const mostrarCssProductos = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/css/styles.css"));

}

const mostrarJsProductos = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/js/productos.js"));

}




module.exports = {

    mostrarProductos,
    mostrarCssProductos,
    mostrarJsProductos

}