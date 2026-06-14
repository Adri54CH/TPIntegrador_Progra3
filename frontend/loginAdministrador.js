document.querySelector(".form-datos").addEventListener("submit",(e)=>{
   
    e.preventDefault();
    
    const email = document.querySelector(".correo-login").value;
    const contrasena = document.querySelector(".contrasena-login").value;

   const datos = {email,contrasena};


    fetch("/formLogin",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    }).then(res => res.json())
    .then(res => {
        //no se encontro al usuario
        if(res.mensaje === "usuario no encontrado"){

            alert("Ingrese un uusario valido");
            
        }
        // se encontro al usuario
        else{

            // se hace una peticion para cargar una nueva pagina 
            window.location.href = "/loginAdministrador.html";


        }
        //Validacion de datos 




    })
    .catch((error)=>{
        console.log(error);

    })
    



})

