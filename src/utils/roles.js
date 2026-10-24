export const roles = [
  { valor: 'Administrador', texto: 'Administrador' },
  { valor: 'Vendedor', texto: 'Vendedor' },
  { valor: 'Cajero', texto: 'Cajero' },
  { valor: 'Cliente', texto: 'Cliente' },
]

// Color de la insignia de cada rol en las tablas y el perfil
export const colorRol = {
  Administrador: 'danger',
  Vendedor: 'dark',
  Cajero: 'dark',
  Cliente: 'secondary',
}

export function esCliente(usuario) {
  return usuario?.rol === 'Cliente'
}

// el administrador no se puede eliminar
export function esAdministrador(usuario) {
  return usuario?.rol === 'Administrador'
}
