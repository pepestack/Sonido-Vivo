import { api } from './api'
import { usuarioDesdeRespuesta } from '../dto/usuario.dto'

export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios')
  return respuesta.data.map(usuarioDesdeRespuesta)
}

export async function obtenerUsuario(id) {
  const respuesta = await api.get(`/usuarios/${id}`)
  return usuarioDesdeRespuesta(respuesta.data)
}

export async function crearUsuario(dto) {
  const respuesta = await api.post('/usuarios', dto)
  return usuarioDesdeRespuesta(respuesta.data.usuario)
}

export async function actualizarUsuario(id, dto) {
  const respuesta = await api.put(`/usuarios/${id}`, dto)
  return usuarioDesdeRespuesta(respuesta.data)
}

// la API no borra la fila: deja la cuenta inactiva y responde 204 sin cuerpo
export async function eliminarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
}
