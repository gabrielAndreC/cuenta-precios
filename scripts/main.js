//Declaracion de funciones y variables
function sumaTotal(arr){
    total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].subtotal);
    }
    total += ".00"
}

function limpiarCarrito(){
    arrCarrito = [];
}

//a este carrito se pushearan los elementos elegidos con su cantidad, por ende con su subtotal
let arrCarrito = [];
let total;
//array de objetos disponibles para elegir
const arrMenu =[
    {img : "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kQXnpmyG/200/200/original?country=ar", 
    nombre : "Hamburguesa Coder", desc : "",  precio : 3400.00, categoria : "HAMBURGUESAS"},
    {img : "https://img.freepik.com/fotos-premium/aros-cebolla-fritos-caja-llevar-aislada_908985-87772.jpg", 
    nombre : "Aros de Cebolla", desc : "",  precio : 800.00, categoria : "EXTRAS"},
    {img : "https://t3.ftcdn.net/jpg/02/29/07/78/360_F_229077882_vk4dlzm9wXQuML6AS2D075w5c3aEmROY.jpg", 
    nombre : "Gaseosa CoderCola M", desc : "",  precio : 900.00, categoria : "BEBIDAS"},
    {img : "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$krXm2g5T/200/200/original?country=ar", 
    nombre : "Hamburguesa Doble", desc : "",  precio : 3200.00, categoria : "HAMBURGUESAS"},
    {img : "https://t3.ftcdn.net/jpg/02/29/07/78/360_F_229077882_vk4dlzm9wXQuML6AS2D075w5c3aEmROY.jpg", 
    nombre : "Gaseosa CoderCola S", desc : "",  precio : 800.00, categoria : "BEBIDAS"},
    {img : "https://ecoallpa.com/portal/wp-content/uploads/2020/05/2d88d833bed2bcfa2d7988f217451d7d-product.jpg", 
    nombre : "Papas Fritas", desc : "",  precio : 650.00, categoria : "EXTRAS"},
    {img : "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kqX8TYcp/200/200/original?country=ar", 
    nombre : "Hamburguesa Simple", desc : "",  precio : 2000.00, categoria : "HAMBURGUESAS"},
    {img : "https://ecoallpa.com/portal/wp-content/uploads/2020/05/2d88d833bed2bcfa2d7988f217451d7d-product.jpg", 
    nombre : "Papas Fritas Grandes", desc : "",  precio : 900.00, categoria : "EXTRAS"},
    {img : "https://t3.ftcdn.net/jpg/02/29/07/78/360_F_229077882_vk4dlzm9wXQuML6AS2D075w5c3aEmROY.jpg", 
    nombre : "Gaseosa CoderCola L", desc : "",  precio : 1200.00, categoria : "BEBIDAS"}
]

//Creacion de cards
const vistaProductos = document.getElementById("vistaProductos");
let cardColores = ["#ffeed7","#ffe2e2","#e7ffd7","#eaeaff"];
let colorSeleccionado = "#ffeed7"
function crearCards(obj) {
    let cardProducto = document.createElement("div");
        cardProducto.id = "cartaProductos";
        cardProducto.setAttribute("style",`background-color:${colorSeleccionado}`)
    let img = document.createElement("img");
        img.src = obj.img;
    let titulo = document.createElement("h2");
        titulo.innerHTML = obj.nombre;
    let desc = document.createElement("p");
        desc.innerHTML = obj.desc;
    let precio = document.createElement("span");
        precio.innerHTML = `$${obj.precio}.00`;
    let input = document.createElement("input")
        input.className = "contadorProducto"
        input.name = obj.nombre;
        input.type = "number";
        input.id = "cantidad";
        input.min = "0";
        input.max = "10";
        input.placeholder = "0";
        input.disabled = true;
    let botonMas = document.createElement("button");
        botonMas.className = "botonMas";
        botonMas.innerText = "+"
    let botonMenos = document.createElement("button");
        botonMenos.className = "botonMenos";
        botonMenos.innerText = "-"

    vistaProductos.appendChild(cardProducto)
    
    cardProducto.appendChild(img)

    let cardInfo = document.createElement("div");
    cardInfo.className = "cardInfo";
    cardInfo.appendChild(titulo)
    cardInfo.appendChild(desc)
    cardInfo.appendChild(precio)
    cardProducto.appendChild(cardInfo)

    let cardContador = document.createElement("div");
    cardContador.className = "cardContador"
    cardContador.appendChild(botonMenos)
    cardContador.appendChild(input)
    cardContador.appendChild(botonMas)
    cardProducto.appendChild(cardContador)
}

let listaAMostrar = [];
listaAMostrar = arrMenu;

listaAMostrar.forEach(el => {
    crearCards(el)
});

//Configurar botones de mas y menos
const botonMas = document.getElementsByClassName("botonMas");
const botonMenos = document.getElementsByClassName("botonMenos");

const activarChange = (elemento) => {
    let evento = new Event("change");
    elemento.dispatchEvent(evento)
};

function configBotones(arr,suma) {
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        const contador = el.parentNode.querySelector('input[type=number]');
        el.onclick = () =>{
            suma ? contador.stepUp() : contador.stepDown();
            activarChange(contador);
        }
    }
}
configBotones(botonMas,true)
configBotones(botonMenos,false)

//Sumar al carrito
let contador = document.getElementsByClassName("contadorProducto");

añadiralCarrito = (el) =>{
    const cantidad = el.value;
    let producto = arrMenu.find((element) => element.nombre === el.name);
    const id = arrMenu.indexOf(producto);
    producto = arrMenu[id]
    const productoExistente = arrCarrito.find(({nombre}) => nombre === el.name)
    
    if (productoExistente == undefined){
        arrCarrito.push({nombre : producto.nombre, precio : producto.precio.toFixed(2), cantidad : parseInt(cantidad), subtotal :(producto.precio*cantidad).toFixed(2)})
    }
    else{
        productoExistente.cantidad = parseInt(cantidad);
        productoExistente.subtotal = parseInt(productoExistente.precio*cantidad).toFixed(2);
    }
    if (cantidad < 1){
        arrCarrito.splice([arrCarrito.indexOf(productoExistente)],1);
    }
}

//Mostrar carrito
mostrarenCarrito = () =>{
    const contenedor = document.getElementById("items");
    contenedor.innerHTML = "";
    arrCarrito.forEach(el => {
        const producto = el;
        
        const item = document.createElement("div");
        item.id="itemCarrito";
        const nombre = document.createElement("p");
        nombre.innerText = `${producto.cantidad} x ${producto.nombre}`;
        const subtotal = document.createElement("span")
        subtotal.innerText = `$${producto.subtotal}`;

        item.appendChild(nombre)
        item.appendChild(subtotal)
        contenedor.appendChild(item)
    });
    sumaTotal(arrCarrito);
    document.getElementById("totalCarrito").innerText = `TOTAL = $${total}`
}
configContadores = () =>{
    for (let i = 0; i < contador.length; i++) {
        const el = contador[i];
        el.addEventListener("change", (event) =>{
            añadiralCarrito(el)
            mostrarenCarrito()
            localStorage.setItem("coderkingCarrito",JSON.stringify(arrCarrito))
        })
    }
}
configContadores();

//Recuperar Carrito
let cargarCarrito = [];
recuperarCarrito = () =>{
    cargarCarrito = JSON.parse(localStorage.getItem("coderkingCarrito"));
    if (cargarCarrito != null && cargarCarrito.length > 0){
        cargarCarrito.forEach(element => {
            arrCarrito.push(element)
        });
        for (let i = 0; i < contador.length; i++) {
            const el = contador[i];
            const producto = arrCarrito.find((element) => element.nombre === el.name);
            if (producto != undefined){
                el.value = producto.cantidad;
            }
        };
        mostrarenCarrito();
    }
}
recuperarCarrito();

//Configurar Filtros
const botonFiltro = document.getElementsByClassName("botonFiltros");

for (let i = 0; i < botonFiltro.length; i++) {
    const boton = botonFiltro[i];
    boton.addEventListener("click",event=>{
        if (boton.name != "TODO"){
            listaAMostrar = arrMenu.filter(el => el.categoria == boton.name)
        }
        else{
            listaAMostrar = arrMenu;
        }
        vistaProductos.innerHTML ="";
        colorSeleccionado = cardColores[i];
        listaAMostrar.forEach(el => {
            crearCards(el)
        });
        configBotones(botonMas,true)
        configBotones(botonMenos,false)
        contador = document.getElementsByClassName("contadorProducto");
        configContadores();
        arrCarrito=[];
        recuperarCarrito();
    })
    boton.setAttribute("style",`background-color:${cardColores[i]}`)
}

//Eliminar ticket viejo
const botonPago = document.getElementById("botonCarrito");
botonPago.addEventListener("click", event =>{
    localStorage.removeItem("coderkingTicket")
})