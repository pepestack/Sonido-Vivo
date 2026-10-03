export const CLAVES = {
  productos: 'productosSonidoVivo',
  usuarios: 'usuariosSonidoVivo',
  carrito: 'carritoSonidoVivo',
}

export function leer(clave, valorInicial) {
  return structuredClone(valorInicial)
}


export function guardar(clave, valor) {
}