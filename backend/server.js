


// importo el modulo express
const express = require("express");
// importo el modulo path de Nodejs
const path = require("path");

const app = express();
const puerto = 3000;

app.use(express.json());
// importo el modulo mysql2
const mysql = require("mysql2");
const { appendFile } = require("fs");
const { fileLoader } = require("ejs");

// importo el modulo de env 
require("dotenv").config({path:__dirname + "/../.env"});


console.log(process.env.PORT);
console.log(process.env.DB_USER);


const conexion = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234",
    database: "autoservicio"
});

conexion.connect((error)=>{
    if(error){
        console.log("Error al conectar:",error);
        return;

    }
    console.log("Conectado a mysql");


})




// Indico a express que se tiene que usar EJS como motor de plantillas .
app.set("view engine","ejs");
// Indico la nueva ubicacion del directorio views 
app.set("views",path.join(__dirname,"views"));


//defino ruta raiz de la web 
app.use(express.static(path.join(__dirname,"public")));

// Se realiza una peticion a la ruta /dashboard del servidor para cargar 
// el dashboard con sus respectivos productos 
app.get("/dashboard",(req,res)=>    {


    conexion.query("SELECT * FROM productos",(error,resultados)=>{
        if(error){
            console.error(error);
            return res.status(500).send("Error del servidor");
        }

        res.render("dashboard",{
            productos:resultados
        });
    })


});

//End point para obtener productos 

app.get("/productos",(req,res)=>{
    
    conexion.query("SELECT * FROM productos",(error,resultado)=>{
        if(error){

            console.log(error);
            return res.status(500).json({error:"Error en la consulta"});

        }
        
        res.json(resultado);
    })
})

// Endpoint para agregar un producto 
app.post("/agregarProducto",(req,res)=>{

    const {nombre,categoria,precio,urlImagen} = req.body;
    const sql = `INSERT INTO productos (nombre, categoria, precio, activo, imagen)
    VALUES (?, ?, ?, ?, ?)`;

    conexion.query(sql,[nombre,categoria,precio,1,urlImagen],(error,resultado)=>{
        if(error)
        {
            console.log(error);
            // Respondo del lado del servidor que algo salio mal.
            return res.status(500).send("Error");

        }

        //Respondo del lado del servidor que todo esta bien
        res.json({ ok: true });
    })


})

//Endpoint para eliminar un producto 

app.delete("/eliminarProducto/:id",(req,res)=>{
    
    const id = req.params.id;

    // Se elimina el producto de la base de datos (baja logica)

    conexion.query("UPDATE productos SET activo = 0 WHERE id = ?",[id],(error,resultado)=>{
        if(error){
            return res.status(500).json({error: "Error al eliminar producto"})
        }

        res.json({mensaje: "Producto eliminado (baja logica)"});
    })
    
})

app.put("/editarProducto/:id",(req,res)=>{
    

    const id = req.params.id; // obtengo la id enviada por la url 
    const datos = req.body; // obtengo el objeto enviado mediante el body
    
 
    

    //Destructuracion del objeto req.body
    const {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria} = req.body;
    const nuevoPrecioLimpio = nuevoPrecio.replace("Precio: $","");
    const nuevoCategoriaLimpio = nuevaCategoria.replace("Categoría: ", "");
 
    // Se edita el producto de la base de datos 

    conexion.query("UPDATE productos SET nombre = ?,precio = ?,imagen=?,categoria=? WHERE id = ?",[nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria,id],(error,resultado)=>{
        
        if(error){
            return res.status(500).json({error:"Error al actualizar"});
            
        }

        res.json({mensaje:"Producto actualizado"});

    })
    
})

app.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname + "/../frontend/ingreso.html"));

    
})

app.put("/activarProducto/:idProducto",(req,res)=>{
    
    const id = req.params.idProducto;


    conexion.query("UPDATE productos SET activo = true WHERE id = ?",[id],(error,resultado)=>{


        if(error){
            console.log(error);
            return res.json({error:"Error en la conexion"});

        }

        return res.json({mensaje:"Producto activado con exito"});

    })



})

// Endpoint para servir el archivo 'loginAdministrador.html'


app.get("/loginAdministrador",(req,res)=>{

    res.sendFile(path.join(__dirname,"../frontend/loginAdministrador.html")); 




});



app.get("/loginAdministrador.css",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"../frontend/loginAdministrador.css"));


})

app.get("/loginAdministrador.js",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"../frontend/loginAdministrador.js"));


})


app.post("/formLogin", async (req,res)=>{
    
    const datos = req.body;
    const {email,contrasena} = datos;

    const usuario = await buscarUsuarioPorEmail(email);
    
    if(!usuario){ 
        
        // uso de return para terminar la funcion 
        return res.json({mensaje:"usuario no valido"})
    }
  

    // verifico que la contraseña coincida
    if(usuario.password === contrasena){

        return res.json({mensaje: "usuario valido"});


    }

    return res.json({mensaje:"contraseña incorrecta"});



 
    





})

//Funcion para hacer la validacion por correo del usuario 
async function buscarUsuarioPorEmail(correo){

    const [filas] = await conexion.query("SELECT * FROM usuarios WHERE correo = ?",[correo]);

    return filas[0];


    

}

// app.get("/ingreso.css",(req,res)=>{
    
//     res.sendFile(path.join(__dirname,"..","frontend","ingreso.css"));

// })


// app.get("/autoservicio.css",(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","frontend","autoservicio.css"));

// })

// app.get("/autoservicio.js",(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","frontend","autoservicio.js"));

// })





app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})

