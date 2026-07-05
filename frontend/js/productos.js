const grilla = document.querySelector("#grilla");

// Ahora la función recibe un 'producto' como parámetro
const card = (producto) => {
    return `
    <article class="tarjeta-producto">
        <!-- Mostramos la imagen de la BD -->
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
        
        <!-- Inyectamos el nombre y el precio -->
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        
        <!-- Le pasamos los datos al botón por si querés armar la lógica del carrito -->
        <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
    </article>
    `;
};

// Función para traer los productos del backend
const cargarProductos = async () => {
    try {
        // OJO: Cambiá esta URL por la ruta real de tu backend (ej: http://localhost:3000/productos)
        const respuesta = await fetch('http://localhost:3000/api/productos'); 
        
        // Convertimos la respuesta a formato JSON
        const productos = await respuesta.json();
        
        // Vaciamos la grilla por las dudas antes de cargar
        grilla.innerHTML = "";
        
        // Recorremos cada producto que llegó de la base de datos
        productos.forEach(producto => {
            // Chequeamos si el producto está activo (usando la columna 'activo' de tu tabla)
            if (producto.activo === 1) {
                // Acumulamos el HTML de cada tarjeta dentro de la grilla
                grilla.innerHTML += card(producto);
            }
        });

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        grilla.innerHTML = "<p>No se pudieron cargar los productos en este momento.</p>";
    }
};

// Cuando la página web termine de cargar, llamamos a la función
document.addEventListener("DOMContentLoaded", cargarProductos);