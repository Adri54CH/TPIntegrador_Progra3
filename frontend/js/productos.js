const BASEURL = "http://localhost:3000/api/";
let productos = []; // Lista global de tus productos
let carrito = [];   // Lista global de los elementos del carrito

const grilla = document.querySelector("#grilla");

// Llama a la ruta 
export async function getProductos() {
    const response = await fetch(BASEURL + "productos");
    return response; 
}

// Tarjetas 
const card = (producto) => {
    let urlImagen = producto.imagen || 'img/default.png';
    if (producto.imagen && !producto.imagen.startsWith('http')) {
        urlImagen = `http://localhost:3000/${producto.imagen}`; 
    }

    return `
    <article class="tarjeta-producto">
        <img src="${urlImagen}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        
        <button class="btn-agregar" data-id="${producto.id}">
            Agregar al carrito
        </button>
    </article>
    `;
};

// Datos y renderizacion
const cargarProductos = async () => {
    try {
        const respuesta = await getProductos(); 
        const data = await respuesta.json();

        console.log("Estructura completa recibida:", data);
        
        productos = data.productos || data.datos || data; 
        
        if (!Array.isArray(productos) && data.payload) {
            productos = data.payload; 
        }

        // Limpiamos la grilla principal
        grilla.innerHTML = "";

        // Agrupamos los productos por categoría en un objeto   
        const categoriasAgrupadas = {};

        productos.forEach(producto => {
            const cumpleActivo = producto.activo === 1 || producto.activo === true;
            if (cumpleActivo) {
                let cat = producto.categoria ? producto.categoria.trim() : "Otros";
                // Guardamos la categoría normalizada para los títulos fijos
                cat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

                if (!categoriasAgrupadas[cat]) {
                    categoriasAgrupadas[cat] = [];
                }
                categoriasAgrupadas[cat].push(producto);
            }
        });

        // Recorremos el objeto agrupado y creamos los bloques fijos en el HTML
        for (const [nombreCategoria, listaDeProductos] of Object.entries(categoriasAgrupadas)) {
            
            const seccionCategoria = document.createElement("div");
            seccionCategoria.className = "categoria-seccion";

            seccionCategoria.setAttribute("data-nombre-cat", nombreCategoria.toLowerCase());
            seccionCategoria.style.width = "100%";
            seccionCategoria.style.marginBottom = "40px";

            let HTMLContenido = `
                <h2 class="titulo-categoria" style="border-bottom: 2px solid #007bff; padding-bottom: 5px; margin-bottom: 20px; text-align: left; color: #2c3e50;">
                    ${nombreCategoria}
                </h2>
                <div class="productos-subgrilla" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
            `;

            listaDeProductos.forEach(producto => {
                HTMLContenido += card(producto);
            });

            HTMLContenido += `</div>`; 
            seccionCategoria.innerHTML = HTMLContenido;
            grilla.appendChild(seccionCategoria);
        }

        // Botones de filtro
        const botonesFiltro = document.querySelectorAll(".btn-filtro");
        botonesFiltro.forEach(boton => {
            boton.addEventListener("click", (e) => {
                // Cambiar clases visuales (activos/inactivos) usando tus clases CSS
                botonesFiltro.forEach(b => b.classList.remove("activo"));
                e.target.classList.add("activo");

                // Filtro seleccionado del botón ('todos', 'mouses', 'teclados', 'audio')
                const filtroSeleccionado = e.target.getAttribute("data-categoria").toLowerCase();
                const secciones = document.querySelectorAll(".categoria-seccion");

                secciones.forEach(seccion => {
                    const nombreCatSeccion = seccion.getAttribute("data-nombre-cat"); // 'mouse', 'teclado', 'auriculares', etc.
                    
                    let mostrar = false;

                    if (filtroSeleccionado === "todos") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "mouses" && nombreCatSeccion === "mouse") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "teclados" && nombreCatSeccion === "teclado") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "audio" && (nombreCatSeccion === "auriculares" || nombreCatSeccion === "parlantes")) {
                        // Si presionan Audio, se muestran tanto auriculares como parlantes al mismo tiempo
                        mostrar = true;
                    }

                    // Aplicamos el cambio visual
                    if (mostrar) {
                        seccion.style.display = "block";
                    } else {
                        seccion.style.display = "none";
                    }
                });
            });
        });

        asignarEventosBotones();

    } catch (error) {
        console.error("Error al conectar con tu base de datos:", error);
        grilla.innerHTML = "<p>No se pudieron cargar los productos en este momento.</p>";
    }
};

// Función global para actualizar el número del botón en el header
const actualizarContadorCarrito = () => {
    const linkCarrito = document.querySelector("#ver-carrito");


    if (linkCarrito) {
        // const totalItems = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
        // linkCarrito.innerText = `Ver Carrito (${totalItems})`;

        linkCarrito.innerHTML = `Ver Carrito (${carrito.length})`;
    }
};

    // Carrito eventos
const asignarEventosBotones = () => {
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idProducto = parseInt(e.target.getAttribute("data-id"));
            const productoOriginal = productos.find(item => item.id === idProducto);
            
            if (productoOriginal) {
                const productoEnCarrito = carrito.find(item => item.id === idProducto);
                
                if (productoEnCarrito) {

                    alert("El producto ya esta en el carrito");
                    return;
                } else {
                    carrito.push(
                        {
                            ...productoOriginal,
                            cantidad:1
                        }
                    );
                }

                // Actualizo el carrito 
                localStorage.setItem("carrito", JSON.stringify(carrito));
                // Actualizo el contador del header 
                actualizarContadorCarrito();
                alert(`¡${productoOriginal.nombre} agregado con éxito!`);
            }
        });
    });
};

// Lanzador de la pagina
const init = () => {

    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    cargarProductos();  
    actualizarContadorCarrito(); 
};

init();