document.querySelector(".form-administrador").addEventListener("submit",async(e)=>{
    
    e.preventDefault();

    const nombre = document.querySelector(".form-nombre").value;
    const email = document.querySelector(".form-email").value;
    const password = document.querySelector(".form-contrasena").value;

    const datos = {
        nombre: nombre,
        email:email,
        password:password
    }

    //Peticion para guardar los datos 

    
    const resultado = await fetch("/api/usuarios",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datos)
        
    });
    
    const data = await resultado.json();
    
    if(data.mensaje){
        
        alert("Usuario administrador creado con exito");
        window.location.href = "/dashboard";


    }
    else
    {
        alert("Error");

    }
    

})