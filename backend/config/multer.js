// Importo el modulo multer 
import multer from 'multer';
import path from 'path';

// Importo la ruta absoluta 'backend'
import {backend_directory} from './paths.js';

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(backend_directory,"../frontend/public/img"));
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

// Exporto el middleware de multer con la configuracion
// previamente cargada
export default upload;



