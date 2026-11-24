import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from './api'
import { guardarSesion, iniciarSesion, obtenerSesion } from './sesionService'

// se reemplaza la instancia de Axios: las pruebas no llaman a la API real
vi.mock('./api', () => ({
  api: { post: vi.fn() },
}))

describe('sesionService', () => {
  // cada prueba parte con localStorage vacío y no deja datos para la siguiente
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('recuerda la sesión guardada y la olvida al guardar null', () => {
    const sesion = { token: 'token-de-prueba', usuario: { id: 5, nombre: 'Cliente', rol: 'Cliente' } }

    guardarSesion(sesion)
    expect(obtenerSesion()).toEqual(sesion)
    guardarSesion(null)
    expect(obtenerSesion()).toBeNull()
  })

  it('iniciarSesion envía correo y contraseña a POST /auth/login y devuelve el token', async () => {
    api.post.mockResolvedValue({ data: { accessToken: 'jwt-123', usuario: { id: 5, rol: 'Cliente' } } })

    const datos = await iniciarSesion('cliente@gmail.com', '1234')

    expect(api.post).toHaveBeenCalledWith('/auth/login', { correo: 'cliente@gmail.com', contrasena: '1234' })
    expect(datos).toEqual({ accessToken: 'jwt-123', usuario: { id: 5, rol: 'Cliente' } })
  })
})
