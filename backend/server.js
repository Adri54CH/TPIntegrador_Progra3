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

// importo el modulo de env 
require("dotenv").config({path:__dirname + "/../.env"});

const routerDashboard = require("./routes/dashboardRoutes");
const router = require("./routes/productRoutes");
const routerAutenticacion = require("./routes/autenticacionRoutes");

// Grupo de rutas para la API
app.use("/api",router);

// Grupo de rutas para el dashboard 
app.use("/dashboard",routerDashboard);

//Grupo de rutas para el 'login'
app.use("/login",routerAutenticacion)




app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));



app.use(express.static(path.join(__dirname,"public")));



app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})