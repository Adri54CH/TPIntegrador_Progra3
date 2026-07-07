const pool = require("../config/db");

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
    mostrarVenta,
    registrarVenta
}