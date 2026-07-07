const productoModel = require("../models/productModel");


const bcrypt = require("bcrypt");

const obtenerProductos = async(req,res)=>{
    
    try{
        const productos = await productoModel.obtenerTodos(); 


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

    const resultado = await productoModel.comprobarProductoPorNombre(nombre);

    // Existe el producto
    if(resultado.length > 0){

        // return res.json({ok:false});
        return res.status(400).json({ok:false});

    }
    
    await productoModel.agregarProducto(nombre,categoria,precio,urlImagen);

    return res.json({ok:true});

    

}


const eliminarProducto = async(req,res)=>{

    const id = req.params.id;

    // Se elimina el producto de la base de datos (baja logica)

    await productoModel.eliminarProducto(id);

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


    await productoModel.editarProducto();

    res.json({mensaje:"Se edito el producto con exito"});


}


const activarProducto = async(req,res)=>{

    const id = req.params.idProducto;


    await productoModel.activarProducto(id);

    res.json({mensaje:"Producto activado"});


}

const obtenerProducto = async(req,res)=>{

    const id = req.params.id;

    const producto = await productoModel.obtenerProducto(id);


    res.json({mensaje:"Producto obtenido con exito",producto});



}

const crearUsuario = async(req,res)=>{
    const {email,password} = req.body;

    const hash = await bcrypt.hash(password,10);

    await productoModel.crearUsuario(email,hash);

    res.json({mensaje:"Administrador creado con exito"});

    

}



module.exports = {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto,
    crearUsuario
};

