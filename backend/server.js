// importo el modulo express
import express from 'express';

// importo el modulo path de Nodejs
import path from 'path';

// importo cors
import cors from 'cors';

// importo el modulo url para poder transformar la ruta en formato URL al usado por el sistema de directorios 
import { fileURLToPath } from 'url';

// importo el modulo 'express-session', un middleware que me permite mantener informacion del usuario entre 
// diferentes peticiones por medio de sesiones 
import session from 'express-session';

// Hago las importaciones de los routers 
import routerDashboard from './routes/dashboardRoutes.js';
import routerAutenticacion from './routes/autenticacionRoutes.js';
import routerProducto from './routes/productRoutes.js';
import routerVenta from './routes/ventaRoutes.js';


// Hago uso de la funcion 'fileURLToPath' para hacer la transformacion a una ruta de sistema 
// import.meta.url-> ruta url al archivo actual
const __filename = fileURLToPath(import.meta.url);
//Uso el metodo 'dirname' para quedarme con el nombre del directorio 
const __dirname = path.dirname(__filename);


// Se inicializa la instancia de express 
const app = express();


// Uso el middleware de aplicacion cors 
app.use(cors()); 

// Se usa el middleware de aplicacion 'express.json()' para poder parsear los datos del body a un objeto .
app.use(express.json());

// Uso el middleware y lo configuro
app.use(session({
    secret: process.env.SESSION_KEY, // clave secreta para firmar la cookie que el servidor oenvia al navegador y asi evitar que el cliente modifique la cookie 
    resave: false, // para que no guarde la sesion nuevamente si no cambio nada 
    saveUninitialized: false // para que no se guarden sesiones vacias
}))


// Grupo de rutas para el dashboard 
app.use("/dashboard",routerDashboard);

//Grupo de rutas para el 'login'
app.use("/",routerAutenticacion)

//Grupo de rutas para los productos 
app.use("/productos",routerProducto);

//Grupo de rutas para las ventas 
app.use("/ventas",routerVenta);


app.set("view engine","ejs"); // Configuro el servidor para que se use el motor de plantilla ejs 

app.set("views",path.join(__dirname,"views")); // Indica donde esta la ubicacion del directorio 'views' donde se encuentran las plantillas

//Middleware para poder servir archivos estaticos desde la carpeta public , 
// la carpeta public para a ser la raiz publica 
app.use(express.static(path.join(__dirname,"../frontend/public")));


app.listen(process.env.PORT,()=>{
    
    console.log(`el servidor esta corriendo en el puerto ${process.env.PORT}`);

})