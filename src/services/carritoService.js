
// Servicio simulado del carrito: lectura/escritura vía utils/almacenamiento
// y operaciones puras (reciben los items y devuelven una lista nueva).
import { CLAVES, guardar, leer } from '../utils/almacenamiento'

export const COSTO_DESPACHO = 6767

export function obtenerCarrito() {
  return leer(CLAVES.carrito, [])
}

export function guardarCarrito(items) {
  guardar(CLAVES.carrito, items)
}

export function agregar(items, producto, cantidad = 1) {
  const existente = items.find((item) => item.id === producto.id)
  if (existente) {
    return items.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item,
    )
  }
  return [
    ...items,
    { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad },
  ]
}

export function cambiarCantidad(items, id, cantidad) {
  return items.map((item) => (item.id === id ? { ...item, cantidad } : item))
}

export function quitar(items, id) {
  return items.filter((item) => item.id !== id)
}

export function calcularTotales(items) {
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const despacho = items.length > 0 ? COSTO_DESPACHO : 0
  return { totalItems, subtotal, despacho, total: subtotal + despacho }
}
