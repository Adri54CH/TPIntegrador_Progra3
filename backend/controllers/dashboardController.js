// importo la funcion del productModel , obtenerTodos 
import * as productModel from '../models/productModel.js';

const mostrarDashboard = async(req,res)=>{


    try{
        // await para esperar que la promesa se resuelva o se rechaze 
        const resultados = await productModel.obtenerTodos();
        
        // se renderiza la vista dashboard 
        res.render("dashboard",{
            productos: resultados
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

