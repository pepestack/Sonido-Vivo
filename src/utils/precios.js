// Precio que se cobra: el que calcula la API; si falta, el promocional o el normal
export function precioFinal(producto) {
  return producto.precioFinal ?? producto.precioPromocional ?? producto.precio
}

export function tienePromocion(producto) {
  return producto.precioPromocional !== null && producto.precioPromocional !== undefined
}
