import { CLAVES, guardar, leer } from '../utils/almacenamiento'

export const COSTO_DESPACHO = 6767
export const MAXIMO_POR_COMPRA = 5

// unidades que se pueden llevar de un producto: el tope por compra o el stock, el menor
export function limiteDe(producto) {
  return Math.max(0, Math.min(MAXIMO_POR_COMPRA, producto.stock))
}

export function obtenerCarrito() {
  return leer(CLAVES.carrito, [])
}

export function guardarCarrito(items) {
  guardar(CLAVES.carrito, items)
}

// Alinea el carrito con el inventario actual: quita lo que ya no existe,
// refresca nombre, precio y stock, y recorta la cantidad al límite vigente
export function sincronizar(items, productos) {
  return items
    .map((item) => {
      const producto = productos.find((p) => p.id === item.id)
      if (!producto) return null
      const cantidad = Math.min(item.cantidad, limiteDe(producto))
      return { id: producto.id, nombre: producto.nombre, precio: producto.precio, stock: producto.stock, cantidad }
    })
    .filter((item) => item !== null && item.cantidad > 0)
}

export function agregar(items, producto, cantidad = 1) {
  const limite = limiteDe(producto)
  const existente = items.find((item) => item.id === producto.id)
  const total = Math.min((existente ? existente.cantidad : 0) + cantidad, limite)
  if (total < 1) return items
  if (existente) {
    return items.map((item) => (item.id === producto.id ? { ...item, cantidad: total } : item))
  }
  return [
    ...items,
    { id: producto.id, nombre: producto.nombre, precio: producto.precio, stock: producto.stock, cantidad: total },
  ]
}

export function cambiarCantidad(items, id, cantidad) {
  return items.map((item) => {
    if (item.id !== id) return item
    return { ...item, cantidad: Math.min(cantidad, limiteDe(item)) }
  })
}

export function quitar(items, id) {
  return items.filter((item) => item.id !== id)
}

// tipoEntrega: 'despacho' (se cobra COSTO_DESPACHO) o 'retiro' en tienda (sin costo)
export function calcularTotales(items, tipoEntrega = 'despacho') {
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const despacho = items.length > 0 && tipoEntrega !== 'retiro' ? COSTO_DESPACHO : 0
  return { totalItems, subtotal, despacho, total: subtotal + despacho }
}
