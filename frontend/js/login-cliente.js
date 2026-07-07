document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("input").value;

    if (!nombre.trim()) {
        alert("Por favor, ingresá tu nombre antes de continuar.");
        return;
    }

    // Guardo el nombre en el navegador
    localStorage.setItem("nombreUsuario", nombre);
    console.log("Nombre guardado con éxito:", localStorage.getItem("nombreUsuario"));

    window.location.href = "productos.html"; 
});