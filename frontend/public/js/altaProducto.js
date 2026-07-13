//Logica para agregar un producto
document.querySelector("form").addEventListener("submit",(e)=>{

    
    e.preventDefault();

            
    const nombre  = document.getElementById("input-nombre").value;
    const categoria  = document.getElementById("input-categoria").value;
    const precio = document.getElementById("input-precio").value;
    const imagen = document.getElementById("imagen").files[0];

    const formData = new FormData();

    formData.append("nombre",nombre);
    formData.append("categoria",categoria);
    formData.append("precio",precio);
    formData.append("imagen",imagen);


    fetch("/productos/agregarProducto",{
        method: "POST",
        body: formData
    }).then(res => {
        
        
        if(!res.ok){
            alert("el producto ya existe");
            throw new Error("error");

        }
        else{
    
            return res.json();
            
        }})
        .then(() => {

            // cambio la pagina 'altaProducto'

            window.location.href = "/dashboard";
        })
        .catch(error=>console.error(error))

})

// Logica para cerrar el formulario 
document.getElementById("cerrar-formulario").addEventListener("click",()=>{

    // cambio de pagina 
    window.location.href = "/dashboard";
    

})

