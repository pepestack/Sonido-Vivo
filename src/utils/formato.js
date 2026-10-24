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

// lista: las categorías actuales (del contexto); si no llega, se usan las iniciales
export function nombreCategoria(valor, lista = categorias) {
  return lista.find((categoria) => categoria.valor === valor)?.texto ?? valor
}

// "Guitarras Acústicas" -> "guitarras-acusticas" (el valor que va en la URL /categoria/...)
export function generarValor(texto) {
  return String(texto ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita tildes: "á" se separa en "a" + tilde y la tilde se borra
    .replace(/[^a-z0-9]+/g, '-')     // espacios y símbolos pasan a un guion
    .replace(/^-+|-+$/g, '')         // sin guiones al inicio ni al final
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

// quita los espacios sobrantes de los campos de texto antes de guardar (registro y admin)
export function normalizarUsuario(valores) {
  return {
    ...valores,
    rut: valores.rut.trim(),
    nombre: valores.nombre.trim(),
    apellido: valores.apellido.trim(),
    correo: valores.correo.trim(),
    direccion: valores.direccion.trim(),
  }
}
