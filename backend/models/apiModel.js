// importo 'pool' del archivo de configuracion
// const { profileEnd } = require("node:console");
const pool = require("../config/db");


const obtenerTodos = async()=>{
    
    try{
        
        // obtengo el resultado de la query
        const resultado = await pool.query("SELECT * FROM productos");
        // Me quedo con el array de productos 'productos'
        const [productos] = resultado;

        return productos;
    }
    catch(error){

        console.error(error);
        
    }


}

const agregarProducto = async(nombre,categoria,precio,urlImagen) =>{


    try{

        const sql = `INSERT INTO productos (nombre, categoria, precio, activo, imagen)
        VALUES (?, ?, ?, ?, ?)`;

        
        await pool.query(sql,[nombre,categoria,precio,1,urlImagen]);


        
    }


    catch(error)
    {
        console.error(error);

    }
}

const eliminarProducto = async(id)=>{

    
    try{
        

        await pool.query("UPDATE productos SET activo = 0 WHERE id = ?",[id]);



    }
    catch(error){
        console.error(error);

    }
}

const editarProducto = async(id, nuevoNombre, nuevoPrecioLimpio, nuevaUrl, nuevoCategoriaLimpio)=>{


    try{
        

        // Se edita el producto de la base de datos 


        await pool.query("UPDATE productos SET nombre = ?,precio = ?,imagen=?,categoria=? WHERE id = ?",[nuevoNombre,nuevoPrecioLimpio,nuevaUrl,nuevoCategoriaLimpio,id]);


    }
    catch(error){
        console.error(error);

    }
}

const activarProducto = async(id)=>{


    try{
        

        await pool.query("UPDATE productos SET activo = true WHERE id = ?",[id]);


    }
    catch(error){
        console.error(error);

    }
}

const obtenerProducto = async(id)=>{

    try{
    
        const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?",[id]);
        
        return rows[0];
    }

    catch(error){

        console.log(error);


    }
} 

const comprobarProductoPorNombre = async(nombre)=>{

    try{
        
        const [rows] = await pool.query("SELECT * FROM productos WHERE nombre=?",[nombre]);
        return rows;
    }
    catch(error){
        
        console.log(error);

    }

}

const registrarVenta = async(total,cliente)=>{
    
    try{

        const [resultadoVenta] = await pool.query("INSERT INTO ventas (cliente_nombre,total,fecha) VALUES(?,?,NOW()",[cliente,total]);

        //Obtengo la id de la venta creada .
        const ventaId = resultadoVenta.insertId;

        for(const item of carrito){
            
            await pool.query("INSERT INTO detalle_venta (venta_id,producto_id,cantidad,precio_unitario) VALUES (?,?,?,?",[
                ventaId,
                item.nombre,
                item.cantidad,
                item.precio
            ]);
        }

        return ventaId; 

        
    }
    catch(error){

        console.log(error);

    }
}


module.exports = {
    obtenerTodos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto,
    comprobarProductoPorNombre,
    registrarVenta
};

