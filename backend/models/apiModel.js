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

const registrarVenta = async(total,cliente,carrito)=>{
    
    try{
        //Guardo informacion del resultado de la consulta 
        const [resultadoVenta] = await pool.query(
        "INSERT INTO ventas (cliente_nombre,total,fecha) VALUES(?,?,NOW())",
        [cliente,total]);

        //Obtengo la id de la venta creada 
        const ventaId = resultadoVenta.insertId;

        for(const item of carrito){
            
            await pool.query("INSERT INTO venta_productos (venta_id,producto_id,cantidad,precio_unitario) VALUES (?,?,?,?)",[
                ventaId,
                item.id,
                item.cantidad,
                item.precio
            ]);
        }

        return ventaId; 

        
    }
    catch(error){

        console.log(error);
        throw error;

    }
}

const mostrarVenta = async(id)=>{

    //Obtengo los datos de la venta 
    const [venta] = await pool.query("SELECT * FROM ventas WHERE id=?",[id]);
    
    //Obtengo los productos de la venta 
    const [productos] = await pool.query("SELECT p.nombre,dv.cantidad,dv.precio_unitario FROM venta_productos dv JOIN productos p ON p.id = dv.producto_id WHERE dv.venta_id = ?",[id]);

    // Retorno la venta y los productos 
    return{
        ...venta[0],
        productos
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
    registrarVenta,
    mostrarVenta
};

