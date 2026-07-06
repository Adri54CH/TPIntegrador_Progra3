const BASEURL = "http://localhost:3000/api/";
let productos = []; // Lista global de tus productos
let carrito = [];   // Lista global de los elementos del carrito

const grilla = document.querySelector("#grilla");

// llama a la ruta 
export async function getProductos() {
    const response = await fetch(BASEURL + "productos");
    return response; 
}

// tarjetas 
const card = (producto) => {
    console.log(producto.imagen)
    return `
    <article class="tarjeta-producto">
        <img src="${producto.imagen || 'img/default.png'}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        
        <!-- Guardamos tu id real en el data-id -->
        <button class="btn-agregar" data-id="${producto.id}">
            Agregar al carrito
        </button>
    </article>
    `;
};

// datos y renderizacion
const cargarProductos = async () => {
    try {
        const respuesta = await getProductos(); 
        const data = await respuesta.json();

        console.log("Estructura completa recibida:", data);
        
        productos = data.productos || data.datos || data; 
        
        if (!Array.isArray(productos) && data.payload) {
            productos = data.payload; // Por si acaso quedó la estructura anterior
        }

        grilla.innerHTML = "";
        
        productos.forEach(producto => {
            if (producto.activo === 1 || producto.activo === true) {
                grilla.innerHTML += card(producto);
            }
        });

        asignarEventosBotones();

    } catch (error) {
        console.error("Error al conectar con tu base de datos:", error);
        grilla.innerHTML = "<p>No se pudieron cargar los productos en este momento.</p>";
    }
};

// 4. carrito
const asignarEventosBotones = () => {
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idProducto = parseInt(e.target.getAttribute("data-id"));
            const productoOriginal = productos.find(item => item.id === idProducto);
            
            if (productoOriginal) {
                // Buscamos si ya existe el producto dentro del carrito
                const productoEnCarrito = carrito.find(item => item.id === idProducto);

                if (productoEnCarrito) {
                    productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
                } else {
                    carrito.push({ ...productoOriginal, cantidad: 1 });
                }

                // Guardamos en el LocalStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                
                console.log("Carrito actual:", carrito);
                alert(`¡${productoOriginal.nombre} agregado con éxito!`);
            }
        });
    });
};
// lanzador de la pagina
const init = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    cargarProductos();
};

init();