let ticket = "";

let arrCarrito = [];
let cargarCarrito = JSON.parse(localStorage.getItem("coderkingCarrito"));
let total;

if (cargarCarrito != null && cargarCarrito.length > 0){
    cargarCarrito.forEach(element => {
        arrCarrito.push(element)
    });
}
function sumaTotal(arr){
    total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].subtotal);
    }
    total += ".00"
}

function generarTicket(genFecha){
    ticket = "";
    const fecha = new Date();
    const fechaHoy = `Fecha: ${('0' + fecha.getDate()).slice(-2)}/${('0' + (fecha.getMonth()+1)).slice(-2)}/${fecha.getFullYear()} Hora: ${fecha.toTimeString()}`;
    if (genFecha){
        ticket += `${fechaHoy}\n\n`;
    }
    for (let i = 0; i < arrCarrito.length; i++) {
        const el = arrCarrito[i];
        el.subtotal = el.precio*el.cantidad;
        ticket += `${el.cantidad} X ${el.precio}\n${(el.nombre).toUpperCase()}.........SUBTOTAL: $${el.subtotal}.00\n\n`;
    }
    sumaTotal(arrCarrito);
    ticket += `TOTAL: $${total}`
}

//Generacion del ticket y Precio final
let impTicket = document.getElementById("ticket");
let cargarTicket = localStorage.getItem("coderkingTicket");

sumaTotal(arrCarrito);
if (total > 0 && cargarTicket == null){
        generarTicket(true)
        impTicket.innerText = ticket;
        localStorage.setItem("coderkingTicket",ticket)
    }
else if(cargarTicket != null){
    impTicket.innerText = cargarTicket;
}
else{
        impTicket.innerText = "Ha surgido un error realizando su pedido. Vuelve a intentarlo";
    }

//Limpiar carrito viejo
localStorage.removeItem("coderkingCarrito");