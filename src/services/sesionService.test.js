import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { guardarSesion, obtenerSesion } from './sesionService'

const sesion = {
  token: 'token-de-prueba',
  usuario: { id: 5, nombre: 'Cliente', apellido: 'Prueba', correo: 'cliente@gmail.com', rol: 'Cliente', activo: true },
}

describe('obtenerSesion y guardarSesion', () => {
  // cada prueba parte con localStorage vacío y no deja datos para la siguiente
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('recuerda la sesión guardada y la olvida al guardar null', () => {
    guardarSesion(sesion)
    expect(obtenerSesion()).toEqual(sesion)
    guardarSesion(null)
    expect(obtenerSesion()).toBeNull()
  })

  it('ignora una sesión antigua que solo guardaba el id del usuario', () => {
    localStorage.setItem('sesionSonidoVivo', '5')
    expect(obtenerSesion()).toBeNull()
  })
})
