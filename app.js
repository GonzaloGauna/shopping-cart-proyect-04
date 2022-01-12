const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar');
let productosCarrito = [];


cargarEventListeners();

// Funciones
function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    listaCarrito.addEventListener('click', eliminarProducto);
    vaciarCarrito.addEventListener('click', () => {
        productosCarrito = [];
        limpiarHTML();
    })
}
// Funcion para agregar un evento al boton de comprar, lee los datos del productos y la agrega a un objeto

function agregarProducto(e) {
    e.preventDefault();
    if( e.target.classList.contains('comprar-btn') ) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}

// Funcion para eliminar un producto del carrito clickeando en la cruz

function eliminarProducto(e) {
    console.log(e.target);
    if( e.target.classList.contains('borrar-producto') ) {
        const productoId = e.target.getAttribute('data-id');

        productosCarrito = productosCarrito.filter( producto => producto.id !== productoId );

        carritoHTML();
    }
}

// Funcion para crear el objeto y agregarle los datos del producto leido

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        producto: producto.querySelector('h4 p').textContent,
        precio: producto.querySelector('h4 span').textContent,
        cantidad: 1,
        id: producto.querySelector('a').getAttribute('data-id'),
    }
    const existe = productosCarrito.some( producto => producto.id === infoProducto.id );
    if( existe ) {
        // console.log("EXISTE...");
        const productos = productosCarrito.map( producto => {
            if( producto.id === infoProducto.id ){
                producto.cantidad++;
                return producto;
            }else {
                return producto;
            }
            productosCarrito = [...productos];
        })
    }else{
        // console.log("NO EXISTE...");
        productosCarrito = [...productosCarrito, infoProducto];
    }
    
    // agrega el objeto con los datos obtenidos a un array

    carritoHTML();
}

function carritoHTML() {

    // limpia el HTML
    limpiarHTML();

    // Recorre el HTML
    productosCarrito.forEach( productos => {
        const { imagen, producto, cantidad, precio, id } = productos;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>
                ${producto}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;
        listaCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    // listaCarrito.innerHTML = '';

    while( listaCarrito.firstChild ) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}
