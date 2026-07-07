document.querySelector(".form-datos").addEventListener("submit",(e)=>{

    e.preventDefault();


    // Obtengo los datos ingresados en el formulario 
    const email = document.querySelector(".correo-login").value;
    const contrasena = document.querySelector(".contrasena-login").value;

    const datos = {email,contrasena};


    fetch("/validarLogin",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    }).then(res => res.json())
    .then(res => {

        //No se encontro al 
        if(!res.salida){
        
            alert(res.mensaje);
            
        }
        // Se encontro al usuario
        else{

            // Se hace una peticion para cargar una nueva pagina 
            window.location.href = "/dashboard";


        }



    })
    .catch((error)=>{
        console.log(error);

    })
    



})

