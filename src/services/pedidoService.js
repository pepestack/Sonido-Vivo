import { ESTADOS_PEDIDO, ESTADO_INICIAL, pedidosIniciales, TARJETA_RECHAZADA } from '../data/pedidos'
import { CLAVES, guardar, leer } from '../utils/almacenamiento'
import { calcularTotales } from './carritoService'

export function obtenerPedidos() {
  return leer(CLAVES.pedidos, pedidosIniciales)
}

export function guardarPedidos(pedidos) {
  guardar(CLAVES.pedidos, pedidos)
}

function siguienteId(pedidos) {
  return pedidos.reduce((max, pedido) => Math.max(max, pedido.id), 0) + 1
}

// Ítems del carrito que ya no existen o cuya cantidad supera el stock actual
export function verificarStock(items, productos) {
  return items.filter((item) => {
    const producto = productos.find((actual) => actual.id === item.id)
    return !producto || producto.stock < item.cantidad
  })
}

// "4111111111111111" -> "•••• 1111"
export function enmascararTarjeta(numero) {
  return `•••• ${String(numero).slice(-4)}`
}

// Simula el cierre de la compra. No modifica nada: devuelve el resultado y quien lo llama decide qué guardar.
// datos: { usuarioId, cliente: { nombre, apellido, correo }, entrega: { tipo, region, comuna, direccion } }
// Devuelve { ok: true, pedido, pedidos } o { ok: false, motivo }
export function procesarCompra({ pedidos, items, productos, datos, numeroTarjeta, fecha = new Date() }) {
  if (items.length === 0) {
    return { ok: false, motivo: 'Tu carrito está vacío.' }
  }

  const sinStock = verificarStock(items, productos)
  if (sinStock.length > 0) {
    const nombres = sinStock.map((item) => item.nombre).join(', ')
    return { ok: false, motivo: `No hay stock suficiente de: ${nombres}.` }
  }

  const tarjeta = String(numeroTarjeta ?? '').replace(/\s/g, '')
  if (tarjeta === TARJETA_RECHAZADA) {
    return { ok: false, motivo: 'El pago fue rechazado por el banco. Intenta con otra tarjeta.' }
  }

  const tipo = datos.entrega.tipo
  const totales = calcularTotales(items, tipo)
  const pedido = {
    id: siguienteId(pedidos),
    fecha: fecha.toISOString(),
    usuarioId: datos.usuarioId ?? null,
    cliente: { ...datos.cliente },
    entrega: tipo === 'retiro' ? { tipo } : { ...datos.entrega },
    // se copia nombre y precio: el comprobante no debe cambiar si después se edita el producto
    items: items.map((item) => ({ id: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad })),
    subtotal: totales.subtotal,
    despacho: totales.despacho,
    total: totales.total,
    estado: ESTADO_INICIAL,
    tarjeta: enmascararTarjeta(tarjeta),
  }
  return { ok: true, pedido, pedidos: [...pedidos, pedido] }
}

// Un estado que no está en ESTADOS_PEDIDO no se aplica
export function cambiarEstado(pedidos, id, estado) {
  if (!ESTADOS_PEDIDO.includes(estado)) return pedidos
  return pedidos.map((pedido) => (pedido.id === id ? { ...pedido, estado } : pedido))
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
  const totalVendido = pedidos.reduce((total, pedido) => total + pedido.total, 0)
  const ticketPromedio = cantidad > 0 ? Math.round(totalVendido / cantidad) : 0

  const porEstado = Object.fromEntries(
    ESTADOS_PEDIDO.map((estado) => [estado, pedidos.filter((pedido) => pedido.estado === estado).length]),
  )

  // unidades y monto vendido de cada producto, de mayor a menor cantidad de unidades
  const vendidos = {}
  pedidos.forEach((pedido) => {
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
