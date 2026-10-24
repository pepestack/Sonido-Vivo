import { CLAVES, guardar, leer } from '../utils/almacenamiento'

// Solo se guarda el id del usuario: sus datos se leen siempre desde la lista de usuarios,
// así los cambios que haga el admin se ven de inmediato. null = nadie inició sesión
export function obtenerSesion() {
  return leer(CLAVES.sesion, null)
}

export function guardarSesion(usuarioId) {
  guardar(CLAVES.sesion, usuarioId)
}

// Devuelve el usuario cuyo correo y contraseña coinciden, o null.
// Una cuenta desactivada no puede iniciar sesión
export function autenticar(usuarios, correo, contrasena) {
  const buscado = String(correo ?? '').trim().toLowerCase()
  const usuario = usuarios.find((actual) => actual.correo.toLowerCase() === buscado)
  if (!usuario || usuario.contrasena !== contrasena || !usuario.activo) return null
  return usuario
}
