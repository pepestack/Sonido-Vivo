export const MAXIMO_POR_COMPRA = 5

// unidades que se pueden llevar de un producto: el tope por compra o el stock, el menor
export function limiteDe(producto) {
  return Math.max(0, Math.min(MAXIMO_POR_COMPRA, producto.stock))
}

// opciones 1..maximo para los selectores de cantidad
export function opcionesCantidad(maximo) {
  return Array.from({ length: Math.max(maximo, 0) }, (_, i) => ({ valor: i + 1, texto: i + 1 }))
}
