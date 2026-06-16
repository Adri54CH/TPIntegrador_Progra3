


// importo el modulo express
const express = require("express");
// importo el modulo path de Nodejs
const path = require("path");

const app = express();
const puerto = 3000;

app.use(express.json());
// importo el modulo mysql2

// importo el modulo de env 
require("dotenv").config({path:__dirname + "/../.env"});

const mysql = require("mysql2/promise");


const pool = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "1234",
    database: "autoservicio"
});




// Indico a express que se tiene que usar EJS como motor de plantillas .
app.set("view engine","ejs");
// Indico la nueva ubicacion del directorio views 
app.set("views",path.join(__dirname,"views"));


//defino ruta raiz de la web 
app.use(express.static(path.join(__dirname,"public")));

// Se realiza una peticion a la ruta /dashboardf del servidor para cargar 
// el dashboard con sus respectivos productos 
app.get("/dashboard",async (req,res)=>    {


    const [resultados] = await pool.query("SELECT * FROM productos");

    res.render("dashboard", {
            productos: resultados
        });




});

//End point para obtener productos 

app.get("/productos",async(req,res)=>{
    
    try{
        
        // obtengo el resulado de la query
        const resultado = await pool.query("SELECT * FROM productos");
        // Me quedo con el array de productos 'productos'
        const [productos] = resultado;
        


        res.json({ok:true,productos});

    }
    catch(error)
    {
        res.json({ok:false});
    }

})

// Endpoint para agregar un producto 
app.post("/agregarProducto",async (req,res)=>{

    const {nombre,categoria,precio,urlImagen} = req.body;
    const sql = `INSERT INTO productos (nombre, categoria, precio, activo, imagen)
    VALUES (?, ?, ?, ?, ?)`;

    try{
    
        
        await pool.query(sql,[nombre,categoria,precio,1,urlImagen]);
        res.json({ok:true});

    }
    catch(error)
    {
        console.log(error);
        res.json({ok:false});


    }




})

//Endpoint para eliminar un producto 

app.delete("/eliminarProducto/:id",async (req,res)=>{
    
    const id = req.params.id;

    // Se elimina el producto de la base de datos (baja logica)

    const [resultado]= await pool.query("UPDATE productos SET activo = 0 WHERE id = ?",[id]);

    // todo salio bien 
    res.json({success:true});

    
})

app.put("/editarProducto/:id",async (req,res)=>{
    

    const id = req.params.id; // obtengo la id enviada por la url 
    const datos = req.body; // obtengo el objeto enviado mediante el body
    

    

    //Destructuracion del objeto req.body
    const {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria} = req.body;
    const nuevoPrecioLimpio = nuevoPrecio.replace("Precio: $","");
    const nuevoCategoriaLimpio = nuevaCategoria.replace("Categoría: ", "");

    // Se edita el producto de la base de datos 


    await pool.query("UPDATE productos SET nombre = ?,precio = ?,imagen=?,categoria=? WHERE id = ?",[nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria,id]);

    res.json({mensaje:"se edito el producto con exito"});

    
    
})


// Endpoint para dar de alta un producto
app.put("/activarProducto/:idProducto",async (req,res)=>{
    
    const id = req.params.idProducto;


    await pool.query("UPDATE productos SET activo = true WHERE id = ?",[id]);

    res.json({mensaje:"producto activado"});




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
    if(usuario.contrasena === contrasena){

        return res.json({mensaje: "usuario valido"});


    }

    return res.json({mensaje:"contraseña incorrecta"});










})

//Funcion para hacer la validacion por correo del usuario 
async function buscarUsuarioPorEmail(correo){

    const [filas] = await pool.query("SELECT * FROM usuarios WHERE correo = ?",[correo]);

    return filas[0];


    

}





app.listen(puerto,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${puerto}`);

})

