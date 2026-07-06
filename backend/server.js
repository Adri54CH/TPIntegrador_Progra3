// importo el modulo express
// importo el modulo de env 
require("dotenv").config({path:__dirname + "/../.env"});
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
const routerApi = require("./routes/apiRoutes");
const routerAutenticacion = require("./routes/autenticacionRoutes");
const routerProducto = require("./routes/productRoutes");

// Grupo de rutas para la API (json)
app.use("/api",routerApi);

// Grupo de rutas para el dashboard 
app.use("/dashboard",routerDashboard);

//Grupo de rutas para el 'login'
app.use("/login",routerAutenticacion)

//Grupo de rutas para los productos 
app.use("/productos",routerProducto);

//Grupo de rutas para el carritos
// app.use("/carrito");

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));



app.use(express.static(path.join(__dirname,"public")));



app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})