document.getElementById("agregar-admin").addEventListener("click",()=>{
    
    window.location.href = "/formUsuario.html";

    
})


// Redireccion a una nueva vista 
const botonAgregar = document.getElementById("agregar-producto").addEventListener("click",()=>{

    window.location.href = "/altaProducto.html";

    

})

document.getElementById("volver-login-admin").addEventListener("click",()=>{

    window.location.href = "/login-admin.html";

})

// logica para cuando se presiona el boton de crear excel de productos
document.getElementById("crear-excel-productos").addEventListener("click",async()=>{
    
    window.location.href = '/productos/excel';




})

const modalEliminacion = document.querySelector(".modal-eliminacion");
let idProductoEliminar = null;

//Logica para eliminar un producto al presionar boton eliminar del elemento DOM.
document.addEventListener("click",(e)=>{

    // Delegacion de eventos 
    if(e.target.classList.contains("btn-eliminar")){
    

        // Se muestra el modal para confirmar la eliminacion
        modalEliminacion.style.display = "flex";

                
        
        idProductoEliminar = e.target.dataset.id;

        
    
    }

})

//  Logica para eliminar el producto luego de confirmar el modal
document.querySelector(".btn-confirmar-eliminacion").addEventListener("click",()=>{


    //Funcion para eliminar el producto
    eliminarProducto(idProductoEliminar).then(()=>{
        
    
        // Hago una peticion para cargar el dashboard

        window.location.href = "/dashboard";


    })

})



document.querySelector(".cancelar-eliminacion").addEventListener("click",()=>{

    modalEliminacion.style.display = "none";
    

})



document.querySelector(".cancelar-activacion").addEventListener("click",()=>{

    modalActivacion.style.display = "none";


})

let idProductoEditar = null;

//Logica para mostrar el modal al presionar 'editar' en un producto
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-editar")){

        const card = e.target.closest(".card");
        // Obtengo la id del producto a editar 
        idProductoEditar = card.querySelector(".btn-eliminar").dataset.id;

        // Hago un redireccionamiento 'peticion GET implicita ' usando queryParameter 

        window.location.href = `/editarProducto.html?id=${idProductoEditar}`;
    }
})



let idProductoActivar = null;
const modalActivacion = document.querySelector(".modal-activacion");
// Logica para mostrar el modal de activacion  de un producto 
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-activar")){


        // Me guardo la id del producto
        idProductoActivar = e.target.closest(".card").dataset.id;


        // Muestro el modal de confirmacion

        modalActivacion.style.display = "flex"


        
    }
})

// Logica para activar el producto al confirmar la activacion del producto (alta logica )
document.querySelector(".btn-confirmar-activacion").addEventListener("click",()=>{
    
    // Peticion para activar  producto


    activarProducto(idProductoActivar);



    
})
function activarProducto(idProducto){

    fetch(`/productos/activarProducto/${idProducto}`,{
        method: "PUT",

    }).then(res => res.json())
    .then(res => {
        
        // Hago una redireccion para volver a cargar dashboard

        window.location.href = "/dashboard";


        
    });

    

    


}

//Funcion para obtener lista de productos 
function obtenerProductos(){
    
    return fetch("/productos")
    .then(res => res.json())
    .then(data => {
        
    
        return data.productos;


    })
    .catch(error =>{
        console.log(error);
    });

    
}



//Funcion para dar la baja logica de un producto dentro del dashboard
function eliminarProducto(idProducto){
    

    // Peticion delete para eliminar un producto
    return fetch(`/productos/eliminarProducto/${idProducto}`,{
        method: "DELETE"
    }).then(res => res.json())
    .then(res => console.log(res))




}



//Funcion para editar un producto del dashboard

function editarProducto(idProducto){


    fetch(`/productos/editarProducto/${idProducto}`,{
        method: "PUT"
    }).then(res => res.json())
    .then(res => console.log(res));

    


}


