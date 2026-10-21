export const CLAVES = {
  productos: 'productosSonidoVivo',
  usuarios: 'usuariosSonidoVivo',
  carrito: 'carritoSonidoVivo',
  sesion: 'sesionSonidoVivo',
}

// Si no hay nada guardado (o el JSON está corrupto) se usa una copia de los datos iniciales,
// así nunca se modifica el arreglo importado desde data/
export function leer(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave)
    if (guardado !== null) return JSON.parse(guardado)
  } catch {
    // localStorage bloqueado o JSON inválido: seguimos con los datos iniciales
  }
  return structuredClone(valorInicial)
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // sin espacio o localStorage bloqueado: la app sigue funcionando, solo no persiste
  }
}
