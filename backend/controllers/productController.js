const path = require("path");


const mostrarProductos = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/productos.html"));

}





module.exports = {

    mostrarProductos

}