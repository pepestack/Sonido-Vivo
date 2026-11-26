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

// { id, rol } actuales según la API; si la cuenta se desactivó o el token no sirve, responde 401
export async function verificarSesion() {
  const respuesta = await api.get('/auth/sesion')
  return respuesta.data.usuario
}

export async function registrar(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}
