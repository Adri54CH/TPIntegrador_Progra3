document.addEventListener("DOMContentLoaded", async() => { 

    //Logica para volver al login del cliente
    document.getElementById("btn-reiniciar").addEventListener("click",()=>{
        window.location.href = "/login-cliente.html"
    })
    // Leo la id de la url 
    const params = new URLSearchParams(window.location.search);
    const idVenta = params.get("id");

    // Peticion para obtener la venta con la id
    const res = await fetch(`/ventas/${idVenta}`);

    const venta = await res.json();

    // Datos de la venta para armar el ticket 
    // console.log(venta);     

    const productosComprados = venta.resultado.productos;

    const contenedorCliente = document.getElementById("cliente-ticket");
    const contenedorLista = document.getElementById("lista-productos");
    const contenedorTotal = document.querySelector(".ticket-total-num");

    // Mostramos el nombre del cliente si agregaste el span
    if (contenedorCliente) {
        contenedorCliente.innerText = venta.resultado.cliente_nombre;
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
        const subtotal = item.precio_unitario * cantidad;
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

    

});