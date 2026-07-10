// importo el modulo express
const express = require("express");
// importo el modulo path de Nodejs
const path = require("path");
// IMPORTAMOS CORS ACÁ
const cors = require("cors"); 

const app = express();
const puerto = 3000;

// CORS
app.use(cors()); 

app.use(express.json());


const routerDashboard = require("./routes/dashboardRoutes");
const routerAutenticacion = require("./routes/autenticacionRoutes");
const routerProducto = require("./routes/productRoutes");
const routerVenta = require("./routes/ventaRoutes");


// Grupo de rutas para el dashboard 
app.use("/dashboard",routerDashboard);

//Grupo de rutas para el 'login'
app.use("/",routerAutenticacion)

//Grupo de rutas para los productos 
app.use("/productos",routerProducto);

//Grupo de rutas para las ventas 
app.use("/ventas",routerVenta);


app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));



app.use(express.static(path.join(__dirname,"../frontend/public")));



app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})