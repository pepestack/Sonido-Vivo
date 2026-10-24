// Precio que se cobra: el de oferta si existe, si no el normal
export function precioFinal(producto) {
  return producto.precioOferta ?? producto.precio
}
