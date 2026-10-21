import { categorias } from '../data/categorias'

export function formatoDinero(monto) {
  return `$${Number(monto).toLocaleString('es-CL')}`
}

// "Sebastian Navarro" -> "SN"
export function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join('')
}

export function nombreCategoria(valor) {
  return categorias.find((categoria) => categoria.valor === valor)?.texto ?? valor
}

// 12 -> "#000012"
export function numeroPedido(id) {
  return `#${String(id).padStart(6, '0')}`
}

// "2026-10-05T15:20:00.000Z" -> "05-10-2026, 12:20" (hora local)
export function formatoFecha(iso) {
  return new Date(iso).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' })
}

export function nombreCompleto(usuario) {
  return `${usuario.nombre} ${usuario.apellido}`.trim()
}
