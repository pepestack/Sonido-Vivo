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

function agregarAlCarrito(id, nombre, precio, cantidad = 1) {
  const cantidadAgregar = Number.parseInt(cantidad, 10) || 1;
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(
    (producto) => String(producto.id) === String(id),
  );

  if (productoExistente) {
    productoExistente.cantidad = (Number(productoExistente.cantidad) || 0) + cantidadAgregar;
  } else {
    carrito.push({
      id: String(id),
      nombre: String(nombre),
      precio: Number(precio),
      cantidad: cantidadAgregar,
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
