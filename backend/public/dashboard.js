// Logica para prevenir el comportamiento por defecto del formulario
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

// Manejo evento y logica al presionar el boton de agregar un producto.
// document.getElementById("btn-agregar-producto").addEventListener("click",()=>{

    // Fetch para hacer una peticion al servidor 
    
    
// })
