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
