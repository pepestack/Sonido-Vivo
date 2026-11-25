import { api } from './api'
import { productoDesdeRespuesta, productoRequestDto } from '../dto/producto.dto'

export async function listarProductos() {
  const respuesta = await api.get('/productos')
  return respuesta.data.map(productoDesdeRespuesta)
}

export async function crearProducto(producto) {
  const respuesta = await api.post('/productos', productoRequestDto(producto))
  return productoDesdeRespuesta(respuesta.data)
}

export async function modificarProducto(idApi, producto) {
  const respuesta = await api.put(`/productos/${idApi}`, productoRequestDto(producto))
  return productoDesdeRespuesta(respuesta.data)
}

export async function eliminarProducto(idApi) {
  await api.delete(`/productos/${idApi}`)
}

export function agregar(productos, nuevo) {
  return [...productos, nuevo]
}

export function reemplazar(productos, id, actualizado) {
  return productos.map((producto) => (producto.id === id ? actualizado : producto))
}

export function eliminar(productos, id) {
  return productos.filter((producto) => producto.id !== id)
}

// Productos que se están acabando: los que tienen el stock en su nivel crítico o por debajo
export function productosCriticos(productos) {
  return productos.filter((producto) => producto.stock <= producto.stockCritico)
}

// Productos en promoción: los que tienen precioOferta
export function productosEnOferta(productos) {
  return productos.filter((producto) => producto.precioOferta !== undefined)
}
