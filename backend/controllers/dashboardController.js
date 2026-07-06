
const productModel = require("../models/productModel");


const mostrarDashboard = async(req,res)=>{
    
    console.log("mostrar productos")
    const resultados = await productModel.obtenerTodos();

    res.render("dashboard",{
        productos: resultados
    })

}



module.exports = {
    mostrarDashboard
};



