import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrocedo un directorio 
const backend_directory = path.join(__dirname,"../");


// Exporto variable que contiene la ruta al directorio 'backend'
export {backend_directory};

