import { ESTADOS_PEDIDO } from '../data/pedidos'
import { api } from './api'
import { obtenerMensajeError } from './errores'

export async function crearPedido(items, { cliente, entrega }) {
  const respuesta = await api.post('/pedidos', {
    items: items.map(({ id, cantidad }) => ({ codigo: id, cantidad })),
    cliente,
    entrega,
    pagoSimulado: 'aprobado',
  })
  if (respuesta.status !== 201) {
    throw new Error('La API no confirmó el registro del pedido.')
  }
  return respuesta.data
}

export async function listarPedidos(signal) {
  const respuesta = await api.get('/pedidos', { signal })
  return respuesta.data
}

export async function obtenerPedido(id, signal) {
  const respuesta = await api.get(`/pedidos/${encodeURIComponent(id)}`, { signal })
  return respuesta.data
}

export async function actualizarEstado(id, estado) {
  const respuesta = await api.put(`/pedidos/${encodeURIComponent(id)}`, { estado })
  return respuesta.data
}

export async function cancelarPedido(id) {
  await api.delete(`/pedidos/${encodeURIComponent(id)}`)
}

export function mensajeErrorPedido(error) {
  const estado = error.response?.status
  const mensaje = error.response?.data?.error
  if (estado === 401) return 'Tu sesión venció o fue rechazada. Vuelve a iniciar sesión.'
  if (estado === 404) return 'No se encontró el pedido.'
  if (estado === 403) return 'No tienes permiso para realizar esta acción.'
  if (estado >= 500) return 'El servidor no pudo completar la solicitud.'
  if (typeof mensaje === 'string' && mensaje) return mensaje
  if (estado === 400) return 'Revisa los datos ingresados e inténtalo nuevamente.'
  if (estado === 409) return 'La solicitud entró en conflicto con el stock o el estado actual del pedido.'
  return obtenerMensajeError(error)
}

// Del más nuevo al más antiguo, sin modificar el arreglo original
export function ordenarRecientes(pedidos) {
  return [...pedidos].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function pedidosDeUsuario(pedidos, usuarioId) {
  return ordenarRecientes(pedidos.filter((pedido) => pedido.usuarioId === usuarioId))
}

// Cifras para el dashboard y los reportes
export function resumenVentas(pedidos) {
  const cantidad = pedidos.length
  const vigentes = pedidos.filter((pedido) => pedido.estado !== 'Cancelado')
  const totalVendido = vigentes.reduce((total, pedido) => total + pedido.total, 0)
  const ticketPromedio = vigentes.length > 0 ? Math.round(totalVendido / vigentes.length) : 0

  const porEstado = Object.fromEntries(
    ESTADOS_PEDIDO.map((estado) => [estado, pedidos.filter((pedido) => pedido.estado === estado).length]),
  )

  // unidades y monto vendido de cada producto, de mayor a menor cantidad de unidades
  const vendidos = {}
  vigentes.forEach((pedido) => {
    pedido.items.forEach((item) => {
      const actual = vendidos[item.id] ?? { id: item.id, nombre: item.nombre, unidades: 0, monto: 0 }
      actual.unidades += item.cantidad
      actual.monto += item.precio * item.cantidad
      vendidos[item.id] = actual
    })
  })
  const masVendidos = Object.values(vendidos).sort((a, b) => b.unidades - a.unidades || b.monto - a.monto)

  return { cantidad, totalVendido, ticketPromedio, porEstado, masVendidos }
}
