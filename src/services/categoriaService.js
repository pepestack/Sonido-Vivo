import { categorias as categoriasIniciales } from '../data/categorias'
import { CLAVES, guardar, leer } from '../utils/almacenamiento'
import { generarValor } from '../utils/formato'

// categorías: [{ valor, texto }]. valor es el identificador (va en la URL y en producto.categoria);
// texto es el nombre que se muestra. Tienen la misma forma que las opciones de un Selector.

export function obtenerCategorias() {
  return leer(CLAVES.categorias, categoriasIniciales)
}

export function guardarCategorias(categorias) {
  guardar(CLAVES.categorias, categorias)
}

export function agregar(categorias, texto) {
  return [...categorias, { valor: generarValor(texto), texto: texto.trim() }]
}

// Solo cambia el nombre visible: el valor se mantiene porque los productos y las URL lo usan
export function actualizar(categorias, valor, texto) {
  return categorias.map((categoria) =>
    categoria.valor === valor ? { ...categoria, texto: texto.trim() } : categoria,
  )
}

export function eliminar(categorias, valor) {
  return categorias.filter((categoria) => categoria.valor !== valor)
}

// Agrega a cada categoría cuántos productos tiene: [{ valor, texto, cantidad }]
export function conCantidades(categorias, productos) {
  return categorias.map((categoria) => ({
    ...categoria,
    cantidad: productos.filter((producto) => producto.categoria === categoria.valor).length,
  }))
}
