//Declaracion de funciones y variables
let total = 0;
let editar = -1;

function sumaTotal(arr){
    total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].subtotal);
    }
    total += ".00"
}

function limpiarCarrito(){
    for (let i = 0; i < arrCarrito.length; i++) {
        if (arrCarrito[i].cantidad <= 0){
            arrCarrito.splice(i,i+1)
        }
    }
}

//a este carrito se pushearan los elementos elegidos con su cantidad, por ende con su subtotal
const arrCarrito = [];

let ticket = "";

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
        ticket += `${el.cantidad} X ${el.precio}\n${(el.nombre).toUpperCase()}.........SUBTOTAL: $${el.subtotal}\n\n`;
    }
    sumaTotal(arrCarrito);
    ticket += `TOTAL: $${total}`
}

//array de objetos disponibles para elegir
const arrCatalogo =[
    prod01 ={ nombre : "Hamburguesa Simple", precio : 1200.00,},
    prod02 ={ nombre : "Hamburguesa Doble", precio : 1900.00,},
    prod03 ={ nombre : "Papas Chicas", precio : 800.00,},
    prod04 ={ nombre : "Papas Grandes", precio : 1000.00,},
    prod05 ={ nombre : "Gaseosa Cola Chica", precio : 600.00,},
    prod06 ={ nombre : "Gaseosa Cola Mediana", precio : 900.00,},
    prod07 ={ nombre : "Gaseosa Cola Grande", precio : 1100.00,},
    prod08 ={ nombre : "Botella de Agua 500ml", precio : 850.00,},
]

//esta string presenta los objetos en el array del catalogo al usuario
let opciones = "";
for (let i = 0; i < arrCatalogo.length; i++) {
    opciones += `${i}. ${arrCatalogo[i].nombre} $${arrCatalogo[i].precio.toFixed(2)} \n`;
}

//Comienza interaccion con el usuario


let comprando = confirm("Bienvenido CoderKing")

//Bucle de compra, mientras sea true se evalua comprando, -1 es la toma de la orden, desde cero se decide que se va a hacer con la orden
while (comprando){
    let seleccion = undefined;
    let cantidad = -1
    if (editar == -1){   
        while (seleccion == undefined){
            if (comprando) {
                seleccion = arrCatalogo[prompt("Este es nuestro menú. Selecione por número lo que desee ordenar:\n\n"+opciones)]
            }
            //el usuario elije lo que quiere y cuanto
            if (seleccion != undefined){
                cantidad = prompt(`Elegiste: ${seleccion.nombre}.\nVale: $${seleccion.precio.toFixed(2)} c/u \n¿Cuantas llevas?`)
                if (cantidad <=0) {
                    seleccion = undefined;
                }
            }
        }
        //de aceptar o ser mayor a cero, se añade al carrito
        if (cantidad > 0){
            const productoExistente = arrCarrito.find(({nombre}) => nombre === seleccion.nombre)
            if (productoExistente == undefined){
                arrCarrito.push({nombre : seleccion.nombre, precio : seleccion.precio.toFixed(2), cantidad : parseInt(cantidad), subtotal :(seleccion.precio*cantidad).toFixed(2)})
            }
            else{
                productoExistente.cantidad += parseInt(cantidad);
            }
            editar = 0
        }
    }

    //Confirmar orden O Editar
    if (editar == 0){
        sumaTotal(arrCarrito);
        generarTicket(false)
        if (arrCarrito.length > 0){
            editar = parseInt(prompt(`Esta es su orden\n\n${ticket}\n\nPara CONFIRMAR ingrese 1\nPara AÑADIR ALGO ingrese 2\nPara QUITAR ALGO ingrese 3\nPara CANCELAR ingrese 4`))
        }
    }

    //Editando
    switch (editar){
        case 1 : //Confirmar
            alert("Disfrute su comida.");
            comprando = false;
            break;

        case 2 : //Añadir algo
            editar = -1;
            break;

        case 3 : //Quitar algo
            limpiarCarrito();
            let orden = "";
            for (let i = 0; i < arrCarrito.length; i++) {
                const el = arrCarrito[i]
                orden += `${i}. ${el.nombre} X ${el.cantidad} = ${el.subtotal}\n`;
            }
            let seleccionEditar = true
            while (seleccionEditar){
            seleccion = arrCarrito[prompt(`Ingrese el numero que quiere editar\n${orden}`)]
            if (seleccion != undefined){
                seleccionEditar = false;
            }
            }
            seleccion.cantidad -= parseInt(prompt(`¿Cuantas ${seleccion.nombre} quiere quitar?`))
            editar = 0;
            break;

        case 4 :
            alert("Pedido Cancelado.")
            arrCarrito = [];
            comprando = false;
            break;

        default :
            editar = 0;
            break;
    }
}

//Generacion del ticket y Precio final
let impTicket = document.getElementById("ticket");

if (arrCarrito.length > 0 && comprando == false){
    limpiarCarrito();
    sumaTotal(arrCarrito);
    if (total > 0){
        generarTicket(true)
        impTicket.innerText = ticket;
    }
    else{
        impTicket.innerText = "Ha surgido un error realizando su pedido. Vuelve a intentarlo";
    }
}

