// ====== CONSTANTES Y LOCALSTORAGE ======
const STORAGE_KEY = 'carritoSonidoVivo';

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// ====== ACTUALIZAR NAVBAR ======
function actualizarContadorNavbar() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, prod) => acc + (parseInt(prod.cantidad) || 0), 0);
    
    // Busca específicamente el badge dentro del botón del carrito
    const badge = document.querySelector('button.orange-btn .badge') || document.querySelector('.badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// ====== AGREGAR PRODUCTO (Para catalogo.js) ======
function agregarAlCarrito(id, nombre, precio) {
    let carrito = obtenerCarrito();
    const existeIndex = carrito.findIndex(prod => prod.id === id);

    if (existeIndex !== -1) {
        carrito[existeIndex].cantidad += 1;
    } else {
        carrito.push({
            id: String(id),
            nombre: String(nombre),
            precio: Number(precio),
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadorNavbar();
}

// ====== FUNCIONES DE CARRITO.HTML ======
function formatoDinero(monto) {
    return '$' + Number(monto).toLocaleString("es-CL");
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(prod => String(prod.id) !== String(id));
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarContadorNavbar();
}

function cambiarCantidad(id, nuevaCantidad) {
    let cantidad = parseInt(nuevaCantidad);
    if (isNaN(cantidad) || cantidad < 1) {
        cantidad = 1;
    }
    
    let carrito = obtenerCarrito();
    const producto = carrito.find(prod => String(prod.id) === String(id));
    if (producto) {
        producto.cantidad = cantidad;
        guardarCarrito(carrito);
        renderizarCarrito();
        actualizarContadorNavbar();
    }
}

function renderizarCarrito() {
    // Captura la tabla del carrito
    const tbody = document.querySelector('table.table tbody');
    if (!tbody) return; // Si no existe la tabla en el HTML, interrumpe

    const carrito = obtenerCarrito();
    tbody.innerHTML = ''; 

    let subtotalGeneral = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 fs-5 text-muted">
                    Tu carrito de compras está vacío.
                </td>
            </tr>`;
    } else {
        carrito.forEach(prod => {
            const subtotalProducto = prod.precio * prod.cantidad;
            subtotalGeneral += subtotalProducto;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <span class="fw-bold">${prod.nombre}</span>
                    </div>
                </td>
                <td>${formatoDinero(prod.precio)}</td>
                <td>
                    <input type="number" class="form-control form-control-sm w-50" 
                           value="${prod.cantidad}" min="1"
                           onchange="cambiarCantidad('${prod.id}', this.value)">
                </td>
                <td>${formatoDinero(subtotalProducto)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${prod.id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Cálculo de montos
    const despacho = carrito.length > 0 ? 6767 : 0;
    const total = subtotalGeneral + despacho;

    // Actualización directa utilizando la estructura exacta de carrito.html
    const cardOrden = document.querySelector('.col-12.col-lg-4 .card');
    if (cardOrden) {
        const lineasDeTexto = cardOrden.querySelectorAll('.d-flex');
        
        // Fila Subtotal
        if (lineasDeTexto[0]) {
            const spans = lineasDeTexto[0].querySelectorAll('span');
            if (spans[1]) spans[1].textContent = formatoDinero(subtotalGeneral);
        }
        // Fila Despacho
        if (lineasDeTexto[1]) {
            const spans = lineasDeTexto[1].querySelectorAll('span');
            if (spans[1]) spans[1].textContent = formatoDinero(despacho);
        }
        // Fila Total
        if (lineasDeTexto[2]) {
            const spans = lineasDeTexto[2].querySelectorAll('span');
            if (spans[1]) spans[1].textContent = formatoDinero(total);
        }
    }
}

// ====== EJECUCIÓN AL CARGAR LA PÁGINA ======
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorNavbar();
    renderizarCarrito();
});