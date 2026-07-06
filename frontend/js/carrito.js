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
    }

    function eliminarProducto(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }

    // Redirección al finalizar
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }
            window.location.href = "ticket.html";
        });
    }

    renderizarCarrito();
});