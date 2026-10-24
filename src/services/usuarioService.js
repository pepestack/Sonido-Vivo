import { usuariosIniciales } from '../data/usuarios'
import { CLAVES, guardar, leer } from '../utils/almacenamiento'

export function obtenerUsuarios() {
  return leer(CLAVES.usuarios, usuariosIniciales)
}

export function guardarUsuarios(usuarios) {
  guardar(CLAVES.usuarios, usuarios)
}

function siguienteId(usuarios) {
  return usuarios.reduce((max, usuario) => Math.max(max, usuario.id), 0) + 1
}

export function agregar(usuarios, nuevo) {
  return [...usuarios, { ...nuevo, id: siguienteId(usuarios), activo: true }]
}

export function actualizar(usuarios, id, cambios) {
  return usuarios.map((usuario) => (usuario.id === id ? { ...usuario, ...cambios, id } : usuario))
}

export function eliminar(usuarios, id) {
  return usuarios.filter((usuario) => usuario.id !== id)
}

// Indica si el correo ya pertenece a otro usuario. Se compara igual que al iniciar sesión
// (sin espacios ni mayúsculas). idExcluido: el usuario que se está editando, para no chocar consigo mismo
export function existeCorreo(usuarios, correo, idExcluido) {
  const buscado = String(correo ?? '').trim().toLowerCase()
  return usuarios.some((usuario) => usuario.id !== idExcluido && usuario.correo.toLowerCase() === buscado)
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
