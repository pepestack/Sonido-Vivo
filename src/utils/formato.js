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

export function nombreCompleto(usuario) {
  return `${usuario.nombre} ${usuario.apellido}`.trim()
}
