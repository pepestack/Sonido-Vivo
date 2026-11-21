import { api } from './api'
import { CLAVES, guardar, leer } from '../utils/almacenamiento'

// { token, usuario } de la última sesión iniciada; null = nadie inició sesión
export function obtenerSesion() {
  const sesion = leer(CLAVES.sesion, null)
  return sesion?.token ? sesion : null
}

export function guardarSesion(sesion) {
  guardar(CLAVES.sesion, sesion)
}

export async function iniciarSesion(correo, contrasena) {
  const respuesta = await api.post('/auth/login', { correo, contrasena })
  return respuesta.data
}

export async function registrar(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}
