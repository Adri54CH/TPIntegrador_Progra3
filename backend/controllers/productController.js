// importo todas las funciones de 'productModel' 
import * as productModel from '../models/productModel.js';

// importo el modulo exceljs para trabajar con archivos excel 
import ExcelJS from 'exceljs';

//Importo el modulo bycrypt 
import bcrypt from 'bcrypt';

const obtenerProductos = async(req,res)=>{
    
    try{
        const productos = await productModel.obtenerTodos(); 


        res.json({ok:true,productos});

    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({ok:false,mensaje:"Error interno del servidor"})
    }

}




const agregarProducto = async(req,res)=>{

    try{
        
        const {nombre,categoria,precio} = req.body;
    
        const imagen = req.file.filename;


        // Valido si el producto existe 
    
        const resultado = await productModel.comprobarProductoPorNombre(nombre);
    
        // Existe el producto
        if(resultado.length > 0){
    
            // return res.json({ok:false});
            return res.status(400).json({ok:false});
    
        }
        
        await productModel.agregarProducto(nombre,categoria,precio,imagen);
    
        return res.json({ok:true});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ok:false,mensaje:"Error interno del servidor"})
        
    }
    

    

}


const eliminarProducto = async(req,res)=>{

    try{
        // se extrae la id de la url 
        const id = req.params.id;
    
        // Se elimina el producto de la base de datos (baja logica)
    
        await productModel.eliminarProducto(id);
    
        // todo salio bien 
        res.json({success:true});
    }
    // bloque catch para manejar las excepciones 
    catch(error){
        console.error(error);

        
    }

}

const editarProducto = async(req,res)=>{

    try{


        const id = req.params.id; // obtengo la id enviada por la url 
        const datos = req.body; // obtengo el objeto enviado mediante el body
         //Destructuracion del objeto req.body
        const {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria} = req.body;
        const nuevoPrecioLimpio = nuevoPrecio.replace("Precio: $","");
        const nuevoCategoriaLimpio = nuevaCategoria.replace("Categoría: ", "");
    
    
        // uso de await para esperar que la promesa se resuelva o se rechaze 
        await productModel.editarProducto(id,nuevoNombre,nuevoPrecioLimpio,nuevaUrl,nuevoCategoriaLimpio);
    
        res.json({mensaje:"Se edito el producto con exito"});

        
    }catch(error){
        console.error(error);
        
    }


}


const activarProducto = async(req,res)=>{

    try{

        // extraigo la id de la url
        const id = req.params.idProducto;
    

        await productModel.activarProducto(id);
    
        res.json({mensaje:"Producto activado"});


        
    }catch(error){
        console.error(error);

    }
    


}

const obtenerProducto = async(req,res)=>{

    try{
        // extraigo la id de la url
        const id = req.params.id;
    
        
        const producto = await productModel.obtenerProducto(id);
    
        res.json({mensaje:"Producto obtenido con exito",producto});

        
    }
    catch(error){
        console.error(error);

    }



}

const crearUsuario = async(req,res)=>{

    try{
        
        // extraigo el email y el password del body de la peticion
        const {email,password} = req.body;
    
        // hasheo la contraseña usando un salt de 10 
        const hash = await bcrypt.hash(password,10);
    
        // espero a que la promesa se resuelva o se rechaze
        await productModel.crearUsuario(email,hash);
    
        res.json({mensaje:"Administrador creado con exito"});



    } // manejo de expeciones generadas por rechazos de las promesas o errores ocurridos dentro del try 
    catch(error){
        console.error(error);
    }


    

}

const generarExcelProductos = async(req,res)=>{

    try{
        const productos = await productModel.obtenerTodos();
        
        // Creo un workbook 
        const workbook = new ExcelJS.Workbook();

        // Creo una hoja 
        const worksheet = workbook.addWorksheet("Productos");

        //Defino las columnas de la hoja

        worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Nombre", key: "nombre", width: 30 },
        { header: "Precio", key: "precio", width: 15 },
        { header: "Imagen", key: "imagen", width: 40 },
        { header: "Categoría", key: "categoria", width: 20 },
        { header: "Activo", key: "activo", width: 10 }

        ]; 

        // Agrego una fila a la hoja por cada producto
        productos.forEach(producto => {
            worksheet.addRow({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria,
                imagen: producto.imagen,
                activo: producto.activo ? "Activo" : "Inactivo"
            })
        });


        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=productos.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({ok:false,mensaje:"Error interno del servidor"})
        
    }

    



}



export {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto,
    crearUsuario,
    generarExcelProductos
};

