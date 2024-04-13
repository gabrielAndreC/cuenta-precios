let total = 0;
let comprando = false;
let producto = "nada";
let peras = 0;
let manzanas = 0;
let arroz = 0;
let pago = false;

const descuento = .20;
const precioManzana = 60;
const precioPera = 55;
const precioArroz = .3;

let hacerDescuento = (a,b) => a - (a*b);

alert("Bienvenido a ¡El Mercadito!");

comprando = confirm("¿Venís a comprar algo? Hoy tenemos un 20% de descuento!");

while (comprando == true){
    if (producto == "nada"){
        producto = prompt("¿Que vas a llevar? Tenemos Manzanas y Peras por unidad. Tambíen vendemos Arroz suelto","");
        if (producto != null) producto = producto.toUpperCase();
    }
    switch (producto) {
        case ("MANZANAS"): case ("MANZANA"):
            manzanas += parseInt(prompt("Cada manzana sale $60 ¿Cuantas llevarás?"));
            producto = "otro";
            break;
        case "PERAS": case "PERA":
            peras += parseInt(prompt("Cada pera sale $55 ¿Cuantas llevarás?"));
            producto = "otro";
            break;
        case "ARROZ":
            arroz += parseInt(prompt("El kilo de arroz sale $300 ¿Cuantos gramos llevás?"));
            producto = "otro";
            break;
        case "otro":
            comprando = confirm("Llevas " + manzanas + " manzanas, " + peras +" peras y " + arroz + " gramos de arroz. ¿Llevás algo más?");
            if (comprando == true){
                producto = "nada";
            }
            break;
        case null:
            comprando = false;
            producto = "nada";
            break;
        default:
            comprando = confirm("Perdón, no tenemos " + producto + ". ¿Querés comprar otra cosa?");
            if (comprando == true){
                producto = "nada";
            }
            break;
    }
}

let totalManzana = manzanas * precioManzana;
let totalPera = peras * precioPera;
let totalArroz = arroz * precioArroz;

let contenido = (totalManzana + totalPera + totalArroz);

total = hacerDescuento(contenido, descuento);

if (!comprando && contenido <=0){
    alert("Vuelva Pronto!")
    contenido = 1;
}
else if (!comprando && contenido >0){
    pago = confirm("LLEVÁS:\n"+manzanas+" Manzanas $"+totalManzana+"\n"+peras+" Peras $"+totalPera+"\n"+arroz+" Gramos de arroz $" +totalArroz+ "\n\nTOTAL SIN DESCUENTO: $" + contenido + "\nTOTAL 20% DE DESCUENTO: $" + total);
    if (pago){
        cotenido = 0;
        alert("Gracias por su dinero. Vuelva pronto.")
        pago = false;
    }
    else{
        contenido = 0;
        alert("No hay pago, No hay producto. Adiós, vuelva pronto... con dinero.")
    }
}

