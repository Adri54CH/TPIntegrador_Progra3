
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

                
                // Limpio los inputs 

                document.getElementById("input-nombre").value = "";
                document.getElementById("input-categoria").value = ""
                document.getElementById("input-precio").value = ""
                document.getElementById("input-url").value = ""

                // Cierro el modal

                document.getElementById("modal").style.display = "none";

                
                //renderizo los productos   
                renderizarProductos();

            
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


        //Funcion para eliminar el producto
        eliminarProducto(id).then(()=>{
            
            // Vuelvo a renderizar los productos d
            renderizarProductos();

        })

        



    }

})

const modalEdicion = document.querySelector(".modal-edicion");

let idProductoEditar = null;

//Logica para mostrar el modal al presionar 'editar' en un producto
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-editar")){
    
        const card = e.target.closest(".card");

        console.log(card.innerHTML);
        idProductoEditar = card.querySelector(".btn-eliminar").dataset.id;

        const nombreProductoEditar = card.querySelector(".nombre-producto").textContent;
        const precioProductoEditar = card.querySelector(".precio-producto").textContent;
        const urlProductoEditar = card.querySelector(".img-producto").src;
        const categoriaProductoEditar = card.querySelector(".categoria-producto").textContent;
        

        // console.log(nombreProductoEditar);

        // ("input-nuevo-nombre").value = nuevoNombre;
    // modalEdicion.getElementById("input-nuevo-precio").value = nuevoPrecio;
    // modalEdicion.getElementById("input-nueva-url").value = nuevaUrl;
    // modalEdicion.getElementById("input-nueva-categoria").value = nuevaCategoria;

        //Se muestra un modal para la carga de nuevos datos
        modalEdicion.style.display = "flex";

        // Se cargan los datos al modal para su posterior modificacion 

        cargarInputsFormulario(nombreProductoEditar,precioProductoEditar,urlProductoEditar,categoriaProductoEditar);


    }
})

// Logica para editar un producto cuando se envia el formulario de nuevos datos
document.querySelector(".form-edicion").addEventListener("submit",(e)=>
{
    
    e.preventDefault();

    const nuevoNombre = document.getElementById("input-nuevo-nombre").value;
    const nuevoPrecio = document.getElementById("input-nuevo-precio").value;
    const nuevaUrl = document.getElementById("input-nueva-url").value;
    const nuevaCategoria = document.getElementById("input-nueva-categoria").value;

    const productoActualizado = {nuevoNombre,nuevoPrecio,nuevaUrl,nuevaCategoria};

    
    // Peticion fetch para hacer los cambios 

    fetch(`/editarProducto/${idProductoEditar}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(productoActualizado)
    }).then(()=>{
        
        // Se cierra el modal 

        modalEdicion.style.display = "none";    

        //Renderiza los productos 
        renderizarProductos();  

    })
    .catch(error =>{
        console.log(error);
    })

})

// Logica para cerrar el modal de edicion
document.querySelector(".cerrar-editar").addEventListener("click",()=>{ 

    modalEdicion.style.display = "none";
})


// Funcion para renderizar los productos


// Logica para volver a activar un producto (alta logica)
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-activar")){


        const idProducto = e.target.closest(".card").dataset.id;


        // Peticion para activar  producto

        activarProducto(idProducto);

        

    }
})

function activarProducto(idProducto){

    fetch(`/activarProducto/${idProducto}`,{
        method: "PUT",

    }).then(res => res.json())
    .then(res => {
        
        console.log(res);


        // Renderizo los productos
        renderizarProductos();


        
    });

    

    


}

async function renderizarProductos(){
    
    const productos = await obtenerProductos();
    
    console.log(productos);

    
    const contenedorCard = document.querySelector(".contenedor-card");

    
    contenedorCard.innerHTML = "";
    
    productos.forEach((producto)=>{
        
        
        contenedorCard.innerHTML += `
            <div class="card" data-id="${producto.id}">
                <img src="${producto.imagen}" width="200">

                <h2 class="nombre-producto">${producto.nombre}</h2>
                <p class="categoria-producto">Categoría: ${producto.categoria}</p>
                <p class="precio-producto">Precio: $${producto.precio}</p>
                <p>Estado: ${producto.activo ? "Activo" : "Inactivo"}</p>

                ${
                    producto.activo
                    ? `
                        <button class="btn-editar">Editar</button>
                        <button class="btn-eliminar" data-id="${producto.id}">
                            Eliminar
                        </button>
                      `
                    : `<button class="btn-activar">Activar</button>`
                }
            </div>

            <hr>
        `;

    })

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
    return fetch(`/eliminarProducto/${idProducto}`,{
        method: "DELETE"
    }).then(res => res.json())
    .then(res => console.log(res))


 

}



//Funcion para editar un producto del dashboard

function editarProducto(idProducto){


    fetch(`/editarProducto/${idProducto}`,{
        method: "PUT"
    }).then(res => res.json())
    .then(res => console.log(res));

    


}

//Funcion para cargar datos al formulario de edicion de un producto

function cargarInputsFormulario(nombreProducto,precioProducto,urlProducto,categoriaProducto){

    modalEdicion.querySelector("#input-nuevo-nombre").value = nombreProducto;
    modalEdicion.querySelector("#input-nuevo-precio").value = precioProducto;
    modalEdicion.querySelector("#input-nueva-url").value = urlProducto;
    modalEdicion.querySelector("#input-nueva-categoria").value = categoriaProducto;


}

