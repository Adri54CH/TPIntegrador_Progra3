// importo 'pool' del archivo de configuracion
import pool from '../config/db.js';

const obtenerTodos = async(pagina,limite)=>{
    
    // calculo el desplazamiento o la cantidad 
    // de productos que tengo que saltar 
    const offset = (pagina - 1) * limite;

    // obtengo los productos de esa esa pagina 
    const [productos] = await pool.query("SELECT * FROM productos LIMIT ? OFFSET ?",[limite,offset]);
    
    // obtengo la cantidad total de productos 
    // aplico doble destructuring 
    const [[resultado]] = await pool.query("SELECT COUNT(*) AS total FROM productos");

    // calculo cuantas paginas existen 

    const totalPaginas = Math.ceil(resultado.total / limite);

    // devuelvo los productos a mostrar y la cantidad de paginas

    return {
        productos,
        totalPaginas
    }    

    
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

