const BASEURL = "http://localhost:3000/";
let productos = []; 
let carrito = [];   

const grilla = document.querySelector("#grilla");

export async function getProductos() {
    const response = await fetch(BASEURL + "productos");
    return response; 
}

const card = (producto) => {
    let urlImagen = producto.imagen ? `/images/${producto.imagen}` : '/images/default.png';
    
    if (producto.imagen && producto.imagen.startsWith('http')) {
        urlImagen = producto.imagen; 
    }

    return `
    <article class="tarjeta-producto">
        <img src="${urlImagen}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: contain; border-radius: 8px; margin-bottom: 10px; padding: 10px;">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>       
        <button class="btn-agregar" data-id="${producto.id || producto._id}">
            Agregar al carrito
        </button>
    </article>
    `;
};

const cargarProductos = async () => {
    try {
        const respuesta = await getProductos(); 
        const data = await respuesta.json();

        console.log("Estructura completa recibida:", data);
        
        productos = data.productos || data.datos || data; 
        
        if (!Array.isArray(productos) && data.payload) {
            productos = data.payload; 
        }

        grilla.innerHTML = "";

        const categoriasAgrupadas = {};

        productos.forEach((producto, index) => {
            const cumpleActivo = producto.activo === 1 || producto.activo === true;
            if (cumpleActivo) {
                if (!producto.id) {
                    producto.id = producto._id || `prod-${index}`;
                }

                let cat = producto.categoria ? producto.categoria.trim() : "Otros";
                cat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

                if (!categoriasAgrupadas[cat]) {
                    categoriasAgrupadas[cat] = [];
                }
                categoriasAgrupadas[cat].push(producto);
            }
        });

        for (const [nombreCategoria, listaDeProductos] of Object.entries(categoriasAgrupadas)) {
            
            const seccionCategoria = document.createElement("div");
            seccionCategoria.className = "categoria-seccion";
            seccionCategoria.setAttribute("data-nombre-cat", nombreCategoria.toLowerCase());
            seccionCategoria.style.width = "100%";
            seccionCategoria.style.marginBottom = "40px";

            let HTMLContenido = `
                <h2 class="titulo-categoria" style="border-bottom: 2px solid #007bff; padding-bottom: 5px; margin-bottom: 20px; text-align: left; color: #f8fafc;">
                    ${nombreCategoria}
                </h2>
                <div class="contenedor-grilla">
            `;

            listaDeProductos.forEach(producto => {
                HTMLContenido += card(producto);
            });

            HTMLContenido += `</div>`; 
            seccionCategoria.innerHTML = HTMLContenido;
            grilla.appendChild(seccionCategoria);
        }

        const botonesFiltro = document.querySelectorAll(".btn-filtro");
        botonesFiltro.forEach(boton => {
            boton.addEventListener("click", (e) => {
                botonesFiltro.forEach(b => b.classList.remove("activo"));
                e.target.classList.add("activo");

                const filtroSeleccionado = e.target.getAttribute("data-categoria").toLowerCase();
                const secciones = document.querySelectorAll(".categoria-seccion");

                secciones.forEach(seccion => {
                    const nombreCatSeccion = seccion.getAttribute("data-nombre-cat"); 
                    
                    let mostrar = false;

                    if (filtroSeleccionado === "todos") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "mouses" && nombreCatSeccion === "mouses") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "teclados" && nombreCatSeccion === "teclados") {
                        mostrar = true;
                    } else if (filtroSeleccionado === "audio" && (nombreCatSeccion === "audio" || nombreCatSeccion === "auriculares" || nombreCatSeccion === "parlantes" || nombreCatSeccion === "microfonos")) {
                        mostrar = true;
                    // LÓGICA DE FUSIÓN PARA VIDEO: Muestra monitores, webcams o pantallas
                    } else if (filtroSeleccionado === "video" && (nombreCatSeccion === "video" || nombreCatSeccion === "monitores" || nombreCatSeccion === "webcam" || nombreCatSeccion === "webcams")) {
                        mostrar = true;
                    }

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

const actualizarContadorCarrito = () => {
    const linkCarrito = document.querySelector("#ver-carrito");
    if (linkCarrito) {
        linkCarrito.innerHTML = `Ver Carrito (${carrito.length})`;
    }
};

const asignarEventosBotones = () => {
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idProducto = e.target.getAttribute("data-id");
            const productoOriginal = productos.find(item => String(item.id || item._id) === idProducto);
            
            if (productoOriginal) {
                const productoEnCarrito = carrito.find(item => String(item.id || item._id) === idProducto);
                
                if (productoEnCarrito) {
                    alert("El producto ya está en el carrito");
                    return;
                } else {
                    carrito.push({
                        ...productoOriginal,
                        cantidad: 1
                    });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarContadorCarrito();
                alert(`¡${productoOriginal.nombre} agregado con éxito!`);
            }
        });
    });
};

const init = () => {

    
    const nombreUsuario = localStorage.getItem("nombreUsuario") || sessionStorage.getItem("nombreCliente");

    if (!nombreUsuario) {
        alert("Debes ingresar tu nombre antes de comprar.");
        window.location.href = "/";
        return; 
    }

    const contenedorNombre = document.querySelector("#nombre-cliente");
    if (contenedorNombre) {
        contenedorNombre.innerText = `Cliente: ${nombreUsuario}`;
    }

    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }


    
    cargarProductos();  
    actualizarContadorCarrito(); 
};

init();