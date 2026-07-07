const modalEdicion = document.querySelector(".modal-edicion");

//Logica para cargar el formulario cuando se termine de cargar la pagina 
document.addEventListener("DOMContentLoaded", () => {

    // Obtengo el valor de id de la url .

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("id");

    // Hago una peticion al servidor para obtener los datos del producto 


    fetch(`/api/producto/${id}`).then(res => res.json())
    .then(res => {

        const {producto} = res;
        
        cargarInputsFormulario(producto.nombre,producto.precio,producto.imagen,producto.categoria);
        
    });

});


// Logica para editar un producto cuando se envia el formulario de nuevos datos
document.querySelector(".form-edicion").addEventListener("submit",(e)=>{
    
    e.preventDefault();



    const nuevoNombre = document.getElementById("input-nuevo-nombre").value;
    const nuevoPrecio = document.getElementById("input-nuevo-precio").value;
    const nuevaUrl = document.getElementById("input-nueva-url").value;
    const nuevaCategoria = document.getElementById("input-nueva-categoria").value;




    const productoActualizado = {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria};

    
    // Peticion fetch para hacer los cambios 

    fetch(`/api/editarProducto/${idProductoEditar}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(productoActualizado)
    }).then(()=>{
        
// Cambio la url para cambiar de vista (dashboard)
        window.location.href = "/dashboard.html";


    })
    .catch(error =>{
        console.log(error);
    })





    


    
})


//Funcion para cargar datos al formulario de edicion de un producto

function cargarInputsFormulario(nombreProducto,precioProducto,urlProducto,categoriaProducto){


    modalEdicion.querySelector("#input-nuevo-nombre").value = nombreProducto;
    modalEdicion.querySelector("#input-nuevo-precio").value = precioProducto;
    modalEdicion.querySelector("#input-nueva-url").value = urlProducto;
    modalEdicion.querySelector("#input-nueva-categoria").value = categoriaProducto;


}

