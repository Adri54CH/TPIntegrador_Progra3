// importo la funcion del productModel , obtenerTodos 
import * as productModel from '../models/productModel.js';

const mostrarDashboard = async(req,res)=>{


    try{
        // obtengo la cantidad de paginas de la url con 
        // req.query, si el valor es undefined se le asigna 1
        const pagina = Number(req.query.page) || 1;
        //defino el limite de productos que quiero mostrar por pagina
        const limite = 5;    
    
        // await para esperar que la promesa se resuelva o se rechaze 
        const resultados = await productModel.obtenerTodos(pagina,limite);
        
        // se renderiza la vista dashboard pasando como valor
        // los productos a mostrar y la cantidad de paginas 
        res.render("dashboard",{
            productos: resultados.productos,
            pagina,
            totalPaginas: resultados.totalPaginas
        });
        
    }
    // se captura el error de la promesa 
    catch(error){
        console.log(error);
        // respondo con texto plano indicando que hubo un error en el servidor 
        res.status(500).send("Error interno del servidor");
        
    }

}




export{
    mostrarDashboard
}

