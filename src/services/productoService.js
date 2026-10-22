import { productosIniciales } from "../data/listaProductos";
import { CLAVES, guardar, leer } from "../utils/almacenamiento";

export function obtenerProductos() {
  return leer(CLAVES.productos, productosIniciales);
}

export function guardarProductos(productos) {
  guardar(CLAVES.productos, productos);
}

export function agregar(productos, nuevo) {
  return [...productos, nuevo]
}

export function actualizarProducto(productos, id, cambios) {
  return productos.map((producto) =>
    producto.id === id ? { ...producto, ...cambios } : producto,
  );
}

export function eliminar(productos, id){
    return productos.filter((producto) => producto.id !== id)
}

// Resta del stock lo vendido en un pedido. items: [{ id, cantidad }]
export function descontarStock(productos, items) {
  return productos.map((producto) => {
    const vendido = items.find((item) => item.id === producto.id)
    return vendido ? { ...producto, stock: Math.max(0, producto.stock - vendido.cantidad) } : producto
  })
}

// Productos que se están acabando: los que tienen el stock en su nivel crítico o por debajo
export function productosCriticos(productos) {
  return productos.filter((producto) => producto.stock <= producto.stockCritico)
}

// Precio que se cobra: el de oferta si existe, si no el normal
export function precioFinal(producto) {
  return producto.precioOferta ?? producto.precio
}

// Productos en promoción: los que tienen precioOferta
export function productosEnOferta(productos) {
  return productos.filter((producto) => producto.precioOferta !== undefined)
}