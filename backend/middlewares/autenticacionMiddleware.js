export const verificarSesion = (req,res,next)=>{
    
    // verifico si la session usuario
    if(!req.session.usuario){
        
        // Hago una redireccion al login administrador 
        return res.redirect("/login-admin.html");
    }

    // next para pasar el control al siguiente middleware o controlador 
    next();

}

