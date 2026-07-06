const apiModel = require("../models/apiModel");

const obtenerProductos = async(req,res)=>{
    
    try{
        console.log("obtenermos los productos en los controladores")
        const productos = await apiModel.obtenerTodos(); 


        res.json({ok:true,productos});

    }
    catch(error)
    {
        res.json({ok:false});
    }

}




const agregarProducto = async(req,res)=>{
    

    const {nombre,categoria,precio,urlImagen} = req.body;


    // Valido si el producto existe 

    const resultado = await apiModel.comprobarProductoPorNombre(nombre);

    // Existe el producto
    if(resultado.length > 0){

        // return res.json({ok:false});
        return res.status(400).json({ok:false});

    }
    
    await apiModel.agregarProducto(nombre,categoria,precio,urlImagen);

    return res.json({ok:true});

    

}


const eliminarProducto = async(req,res)=>{

    const id = req.params.id;

    // Se elimina el producto de la base de datos (baja logica)

    await apiModel.eliminarProducto(id);

    // todo salio bien 
    res.json({success:true});

}

const editarProducto = async(req,res)=>{


    const id = req.params.id; // obtengo la id enviada por la url 
    const datos = req.body; // obtengo el objeto enviado mediante el body
    
     //Destructuracion del objeto req.body
    const {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria} = req.body;
    const nuevoPrecioLimpio = nuevoPrecio.replace("Precio: $","");
    const nuevoCategoriaLimpio = nuevaCategoria.replace("Categoría: ", "");


    await apiModel.editarProducto();

    res.json({mensaje:"Se edito el producto con exito"});


}


const activarProducto = async(req,res)=>{

    const id = req.params.idProducto;


    await apiModel.activarProducto(id);

    res.json({mensaje:"Producto activado"});


}

const obtenerProducto = async(req,res)=>{

    const id = req.params.id;

    const producto = await apiModel.obtenerProducto(id);


    res.json({mensaje:"Producto obtenido con exito",producto});



}

const registrarVenta = async(req,res)=>{

    const {cliente,carrito}=req.body;

    let total = 0;

    //Calculo el total de la venta 
    carrito.forEach(item=>{
        total+=item.precio * item.cantidad;
    })

    //Inserto registro en tabla ventas
    
    const idVenta = await apiModel.registrarVenta(total,cliente);

    res.json({ok:true,idVenta,total});

    

}


module.exports = {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto,
    registrarVenta
};

