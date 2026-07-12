import multer from 'multer';
import path from 'path';


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

export default upload;



