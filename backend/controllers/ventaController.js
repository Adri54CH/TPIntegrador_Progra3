import * as ventaModel from '../models/ventaModel.js';

const registrarVenta = async(req,res)=>{


    try{

        // Extraigo el nombre del cliente y el carrito del body
        const {nombreCliente,carrito}=req.body;
        let total = 0;
    
        //Calculo el total de la venta 
        carrito.forEach(item=>{
            total+=item.precio * item.cantidad;
        })
    
        //Inserto registro en tabla ventas
        
        const idVenta = await ventaModel.registrarVenta(total,nombreCliente,carrito);
    
        return res.json({ok:true,idVenta,total});

        
    }
    // manejo de excepciones 
    catch(error){
        console.error(error);
        return res.json({ok:false,mensaje:"Error interno del servidor"});s
    }


    

}

const mostrarVenta = async(req,res)=>{

    try{
        // extraigo la id 
        const id = req.params.id;
    
        // await para esperar que la promesa se cumpla o rechaze 
        const resultado = await ventaModel.mostrarVenta(id);
    
        // si no se encuentrala venta se envia un mensaje indicando que la venta no fue encontrada
        if(!resultado){
            
            return res.status(400).json({mensaje:"Venta no encontrada"})
    
        }
        
        // Respondo con la informacion de la venta 
        return res.json({resultado});
        
    }
    // catch para manejo de excepciones 
    catch(error){
        
        console.error(error);
        //Respondo enviando un mensaje de error del servidor
        return res.json({mensaje:"Error interno del servidor"});
    }

}

export{
    registrarVenta,
    mostrarVenta
}