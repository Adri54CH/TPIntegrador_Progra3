const form = document.querySelector("form").addEventListener("submit",(e)=>{

    e.preventDefault();

    // Obtengo el nombre ingresado

    const nombre = document.querySelector("input").value;


    // Guardo nombre en el navegador    
    localStorage.setItem("nombreUsuario",nombre);
    
    // Redirecciono a la vista de productos 

    window.location.href = "/productos";

    


})