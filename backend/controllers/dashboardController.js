
const productModel = require("../models/productModel");


const mostrarDashboard = async(req,res)=>{
    
    const resultados = await productModel.obtenerTodos();

    res.render("dashboard",{
        productos: resultados
    })

}




module.exports = {
    mostrarDashboard
};



