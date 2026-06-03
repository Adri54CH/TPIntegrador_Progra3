


// importo el modulo express
const express = require("express");
// importo el modulo path de Nodejs
const path = require("path");

const app = express();
const puerto = 3000;

// importo el modulo mysql2
const mysql = require("mysql2");

// importo el modulo de env 
require("dotenv").config({path:"tp_integrador/.env"});

console.log(process.env.PORT);
// console.log(process..X)

const conexion = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234",
    database: "colegio"
});

conexion.connect((error)=>{
    if(error){
        console.log("Error al conectar:",error);
        return;

    }
    console.log("Conectado a mysql");


})

conexion.query(
    "SELECT * FROM alumnos",
    (error,resultado)=>{
        if(error){
            console.log(error);
            return;
        }
        else{
            console.log(resultado);

        }
    }
);


// Indico a express que se tiene que usar EJS como motor de plantillas .
app.set("view engine","ejs");
// Indico la nueva ubicacion del directorio views 
app.set("views",path.join(__dirname,"views"));


//defino ruta raiz de la web 
app.use(express.static(path.join(__dirname,"..","public")));

app.get("/",(req,res)=>{

    // res.sendFile(path.join(__dirname,"..","frontend","ingreso.html"));
    res.render("productos",{
        nombre:"Adrian"
    });

    

}); 

app.get("/ingreso.css",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"..","frontend","ingreso.css"));

})


app.get("/autoservicio.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","frontend","autoservicio.css"));

})

app.get("/autoservicio.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","frontend","autoservicio.js"));

})


app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})

