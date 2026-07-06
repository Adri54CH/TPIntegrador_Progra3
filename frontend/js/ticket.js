document.addEventListener("DOMContentLoaded", () => {
    //  Datos del localStorage
    const cliente = localStorage.getItem("nombreUsuario") || "Cliente";
    const productosComprados = JSON.parse(localStorage.getItem("carrito")) || [];


    const contenedorCliente = document.getElementById("cliente-ticket");
    const contenedorLista = document.getElementById("lista-productos");
    const contenedorTotal = document.querySelector(".total strong");

    // Mostramos el nombre del cliente si agregaste el span
    if (contenedorCliente) {
        contenedorCliente.innerText = cliente;
    }

    // Si por alguna razón el carrito está vacío, avisamos
    if (productosComprados.length === 0) {
        if (contenedorLista) {
            contenedorLista.innerHTML = `<tr><td colspan="2">No hay productos registrados</td></tr>`;
        }
        return;
    }

    let totalGeneral = 0;
    let filasHTML = "";

    productosComprados.forEach(item => {
        const cantidad = item.cantidad || 1;
        const subtotal = item.precio * cantidad;
        totalGeneral += subtotal;

        filasHTML += `
            <tr>
                <td>${item.nombre} ${cantidad > 1 ? `(x${cantidad})` : ''}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    // Inyectamos los datos en el documento
    if (contenedorLista) {
        contenedorLista.innerHTML = filasHTML;
    }

    if (contenedorTotal) {
        contenedorTotal.innerText = `Total: $${totalGeneral.toFixed(2)}`;
    }

    localStorage.removeItem("carrito");
});