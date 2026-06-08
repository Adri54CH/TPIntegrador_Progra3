// Logica para agregar un producto 
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const nombre  = document.getElementById("input-nombre").value;
    const categoria  = document.getElementById("input-categoria").value;
    const precio = document.getElementById("input-precio").value;
    const urlImagen = document.getElementById("input-url").value;

    fetch("/agregarProducto",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            nombre,
            categoria,
            precio,
            urlImagen
        })
    }).then(res => res.json())
    .then(data => {
        console.log(data);

        if(data.ok){
            alert("Producto agregado");
        }
    })
    .catch(error=>console.error(error))

})

// Logica para mostrar el modal de agregado de producto
document.getElementById("agregar-producto").addEventListener("click",()=>{
    
    document.getElementById("modal").style.display = "flex";
    

})

// Logica para cerrar el modal de agreado de producto
document.getElementById("cerrar-modal").addEventListener("click",()=>{

    document.getElementById("modal").style.display = "none";
})


//Logica para eliminar un producto al presionar boton eliminar del elemento DOM.
document.addEventListener("click",(e)=>{

    // Delegacion de eventos 
    if(e.target.classList.contains("btn-eliminar")){
    
        const id = e.target.dataset.id;


        //FDuncion para eliminar el producto
        eliminarProducto(id);

    }

})

const modalEdicion = document.querySelector(".modal-edicion");

//Logica para editar un producto al presionar 'editar'
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-editar")){
    
        const id = e.target.nextElementSibling.dataset.id;
        
        //Se muestra un modal para la carga de nuevos datos
        
        modalEdicion.style.display = "flex";

        //Funcion para editar un producto




    }
})


// Logica para cerrar el modal de edicion
document.querySelector(".cerrar-editar").addEventListener("click",()=>{ 

    modalEdicion.style.display = "none";
})



//Funcion para obtener lista de productos 
function obtenerProductos(){
    
    return fetch("/productos")
    .then(res => res.json())
    .then(data => {
        return data;
    })
    .catch(error =>{
        console.log(error);
    });


}



//Funcion para dar la baja logica de un producto dentro del dashboard
async function eliminarProducto(idProducto){
    
    const resultado = await obtenerProductos();

    // Peticion delete para eliminar un producto
    fetch(`/eliminarProducto/${idProducto}`,{
        method: "DELETE"
    }).then(res => res.json())
    .then(res => console.log(res))


 

}



//Funcion para editar un producto del dashboard

async function editarProducto(idProducto){

    const resultado = await obtenerProductos();

    fetch(`/editarProducto/${idProducto}`,{
        method: "PUT"
    }).then(res => res.json())
    .then(res => console.log(res));

    


}