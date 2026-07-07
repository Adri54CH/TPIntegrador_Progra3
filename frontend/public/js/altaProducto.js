//Logica para agregar un producto
document.querySelector("form").addEventListener("submit",(e)=>{

    
    e.preventDefault();

    

            
    const nombre  = document.getElementById("input-nombre").value;
    const categoria  = document.getElementById("input-categoria").value;
    const precio = document.getElementById("input-precio").value;
    const urlImagen = document.getElementById("input-url").value;




    fetch("/productos/agregarProducto",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            nombre,
            categoria,
            precio,
            urlImagen
        })
    }).then(res => {
        
        
        if(!res.ok){
            alert("el producto ya existe");
            throw new Error("error");

        }
        else{
    
            return res.json();
            
        }})
        .then(() => {

            // Limpio los inputs 
            
            document.getElementById("input-nombre").value = "";
            document.getElementById("input-categoria").value = ""
            document.getElementById("input-precio").value = ""
            document.getElementById("input-url").value = ""


            // cambio la pagina 'altaProducto'

            window.location.href = "/dashboard";
        })
        .catch(error=>console.error(error))

})

// Logica para cerrar el formulario 
document.getElementById("cerrar-modal").addEventListener("click",()=>{

    // cambio de pagina 
    window.location.href = "/dashboard";


})

