document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const tbody = document.getElementById("carrito-body");
    const totalSpan = document.getElementById("total-carrito");
    const btnFinalizar = document.querySelector(".btn-finalizar");

    const actualizarContadorCarrito = () => {
        const linkCarrito = document.querySelector("#ver-carrito");
        if (linkCarrito) {
            const totalItems = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
            linkCarrito.innerText = `Volver al catálogo (${totalItems})`; 
        }
    };

    function renderizarCarrito() {
        // Ejecutamos la actualización del contador del header
        actualizarContadorCarrito();

        if (carrito.length === 0) {
            tbody.innerHTML = `
                <tr id="carrito-vacio-row">
                    <td colspan="3" class="carrito-vacio-msg">
                        Tu carrito está vacío
                    </td>
                </tr>
            `;
            totalSpan.innerText = "$0";
            return;
        }

        tbody.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const cantidad = producto.cantidad || 1;
            const subtotal = producto.precio * cantidad;
            total += subtotal;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre} (x${cantidad})</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn-sumarCantidad" data-index="${index}" style="background: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
                        +
                    </button>
                </td>
                <td>
                    <button class="btn-bajarCantidad" data-index="${index}" style="background: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
                        -
                    </button>
                </td>
                <td>
                    <button class="btn-eliminar" data-index="${index}" style="background: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
                        Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        totalSpan.innerText = `$${total.toFixed(2)}`;

        // Enganchamos los eventos de eliminación
        document.querySelectorAll(".btn-eliminar").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                eliminarProducto(index);
            });
        });

        //Enganchamos los eventos para sumar la cantidad de un producto 
        
        document.querySelectorAll(".btn-sumarCantidad").forEach(boton =>{

            boton.addEventListener("click",(e)=>{
                
                const index = e.target.getAttribute("data-index");

                carrito[index].cantidad += 1;

                localStorage.setItem("carrito",JSON.stringify(carrito));
                
                renderizarCarrito();

            });



        })
        
    
        //Enganchamos los eventos para restar la cantidad a un producto

        document.querySelectorAll(".btn-bajarCantidad").forEach(boton =>{
            
            boton.addEventListener("click",(e)=>{
                const index = e.target.getAttribute("data-index");

                if(carrito[index].cantidad > 1){
                    
                    carrito[index].cantidad -= 1;

                }
                else{
                    carrito.splice(index, 1); // lo elimina si llega a 1
                }

                localStorage.setItem("carrito",JSON.stringify(carrito));

                renderizarCarrito();
            })
        })
    }

    function eliminarProducto(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }

    // Redirección al finalizar
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", async() => {
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }


            //Obtengo el nombre del cliente 

            const nombreCliente = localStorage.getItem("nombreUsuario");
            
            const respuesta = await fetch("/api/ventas",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    nombreCliente,
                    carrito
                    
                })
            });

            const data = await respuesta.json();

            //Se limpia el carrito

            localStorage.removeItem("carrito");
            
            window.location.href = "/ticket";
        });
    }

    renderizarCarrito();
});