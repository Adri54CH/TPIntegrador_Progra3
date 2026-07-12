// importo 'pool' del archivo de configuracion
import pool from '../config/db.js';

const obtenerTodos = async()=>{
    

    const resultado = await pool.query("SELECT * FROM productos");
    // Me quedo con el array de productos 'productos'
    const [productos] = resultado;
    
    
    return productos;
    
}

const agregarProducto = async(nombre,categoria,precio,urlImagen) =>{

    const sql = `INSERT INTO productos (nombre, categoria, precio, activo, imagen)
    VALUES (?, ?, ?, ?, ?)`;

    
    await pool.query(sql,[nombre,categoria,precio,1,urlImagen]);


}

const eliminarProducto = async(id)=>{

    await pool.query("UPDATE productos SET activo = 0 WHERE id = ?",[id]);

}

const editarProducto = async(id, nuevoNombre, nuevoPrecioLimpio, nuevaUrl, nuevoCategoriaLimpio)=>{

    // Se edita el producto de la base de datos 
    await pool.query("UPDATE productos SET nombre = ?,precio = ?,imagen=?,categoria=? WHERE id = ?",[nuevoNombre,nuevoPrecioLimpio,nuevaUrl,nuevoCategoriaLimpio,id]);


}

const activarProducto = async(id)=>{

    await pool.query("UPDATE productos SET activo = true WHERE id = ?",[id]);


}

const obtenerProducto = async(id)=>{

    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?",[id]);
    
    return rows[0];
    

} 

const comprobarProductoPorNombre = async(nombre)=>{

    // console.log("el nombre que llego es",nombre);
    const [rows] = await pool.query("SELECT * FROM productos WHERE nombre=?",[nombre]);
    return rows;


}

const crearUsuario = async(correo,hash)=>{

    const sql = "INSERT INTO usuarios(correo,contrasena) VALUES(?,?)";

    await pool.query(sql,[correo,hash]);


}

export {
    obtenerTodos,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    activarProducto,
    obtenerProducto,
    comprobarProductoPorNombre,
    crearUsuario
};

