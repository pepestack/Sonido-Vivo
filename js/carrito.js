<<<<<<< HEAD
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
=======
const STORAGE_KEY = "carritoSonidoVivo";
const SHIPPING_COST = 6767;

function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem(STORAGE_KEY);

  if (!carritoGuardado) {
    return [];
  }

  try {
    const carrito = JSON.parse(carritoGuardado);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error("No se pudo leer el carrito guardado.", error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

function actualizarContadorNavbar() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce(
    (total, producto) => total + (Number(producto.cantidad) || 0),
    0,
  );
  const badge = document.querySelector(".badge");

  if (badge) {
    badge.textContent = totalItems;
  }
}

function agregarAlCarrito(id, nombre, precio) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(
    (producto) => String(producto.id) === String(id),
  );

  if (productoExistente) {
    productoExistente.cantidad = (Number(productoExistente.cantidad) || 0) + 1;
  } else {
    carrito.push({
      id: String(id),
      nombre: String(nombre),
      precio: Number(precio),
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  actualizarContadorNavbar();
}

function formatoDinero(monto) {
  return `$${Number(monto).toLocaleString("es-CL")}`;
}

function renderizarCarrito() {
  const tbody = document.getElementById("tabla-carrito");

  if (!tbody) {
    return;
  }

  const carrito = obtenerCarrito();
  tbody.innerHTML = "";
  let subtotal = 0;

  if (carrito.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          Tu carrito de compras está vacío.
        </td>
      </tr>
    `;
  } else {
    carrito.forEach((producto) => {
      const cantidad = Number(producto.cantidad) || 1;
      const subtotalProducto = Number(producto.precio) * cantidad;
      subtotal += subtotalProducto;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><span class="fw-bold">${producto.nombre}</span></td>
        <td>${formatoDinero(producto.precio)}</td>
        <td>
          <input type="number" class="form-control form-control-sm w-50"
            value="${cantidad}" min="1" data-product-id="${producto.id}">
        </td>
        <td>${formatoDinero(subtotalProducto)}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-remove-product-id="${producto.id}">
            Eliminar
          </button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  const despacho = carrito.length > 0 ? SHIPPING_COST : 0;
  document.getElementById("cart-subtotal").textContent = formatoDinero(subtotal);
  document.getElementById("cart-shipping").textContent = formatoDinero(despacho);
  document.getElementById("cart-total").textContent = formatoDinero(subtotal + despacho);
  actualizarContadorNavbar();
}

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-product-id]");

  if (!input) {
    return;
  }

  const cantidad = Number.parseInt(input.value, 10);
  const carrito = obtenerCarrito();
  const producto = carrito.find(
    (item) => String(item.id) === String(input.dataset.productId),
  );

  if (!producto || !Number.isInteger(cantidad) || cantidad < 1) {
    renderizarCarrito();
    return;
  }

  producto.cantidad = cantidad;
  guardarCarrito(carrito);
  renderizarCarrito();
});

document.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-remove-product-id]");

  if (!boton) {
    return;
  }

  const carrito = obtenerCarrito().filter(
    (producto) => String(producto.id) !== String(boton.dataset.removeProductId),
  );
  guardarCarrito(carrito);
  renderizarCarrito();
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorNavbar();
  renderizarCarrito();
});
>>>>>>> 1dbc7f1 (fix: mostrar productos guardados en el carrito)
