const productModel = require("../models/productModel");

const obtenerProductos = async(req,res)=>{
    
    try{
        
        const productos = await productModel.obtenerTodos(); 


        res.json({ok:true,productos});

    }
    catch(error)
    {
        res.json({ok:false});
    }

}


const agregarProducto = async(req,res)=>{
    

    const {nombre,categoria,precio,urlImagen} = req.body;



    await productModel.agregarProducto(nombre,categoria,precio,urlImagen);

    res.json({ok:true});

    

}


const eliminarProducto = async(req,res)=>{

    const id = req.params.id;

    // Se elimina el producto de la base de datos (baja logica)

    await productModel.eliminarProducto(id);

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


    await productModel.editarProducto();

    res.json({mensaje:"Se edito el producto con exito"});


}


const activarProducto = async(req,res)=>{

    const id = req.params.idProducto;


    await productModel.activarProducto(id);

    res.json({mensaje:"Producto activado"});


}

const obtenerProducto = async(req,res)=>{

    const id = req.params.id;

    const producto = await productModel.obtenerProducto(id);


    res.json({mensaje:"Producto obtenido con exito",producto});



}




module.exports = {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto
};

