const ventaModel = require("../models/ventaModel");

const registrarVenta = async(req,res)=>{

    const {nombreCliente,carrito}=req.body;
    let total = 0;

    //Calculo el total de la venta 
    carrito.forEach(item=>{
        total+=item.precio * item.cantidad;
    })

    //Inserto registro en tabla ventas
    
    const idVenta = await ventaModel.registrarVenta(total,nombreCliente,carrito);

    res.json({ok:true,idVenta,total});

    

}

const mostrarVenta = async(req,res)=>{

    const id = req.params.id;

    const resultado = await ventaModel.mostrarVenta(id);

    if(!resultado){
        
        return res.status(400).json({mensaje:"Venta no encontrada"})

    }
    
    // Respondo con la informacion de la venta 
    res.json({resultado});
}

module.exports = {
    registrarVenta,
    mostrarVenta
}