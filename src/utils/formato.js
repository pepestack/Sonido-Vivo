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

// Lee un archivo de imagen como data URL (texto), así se puede guardar en el estado
// y más adelante también en localStorage
export function leerImagenComoUrl(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = reject
    lector.readAsDataURL(archivo)
  })
}
