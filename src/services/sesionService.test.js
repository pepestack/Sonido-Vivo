import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { autenticar, esCliente, guardarSesion, obtenerSesion } from './sesionService'

const usuarios = [
  { id: 1, correo: 'admin@duoc.cl', contrasena: '1234', rol: 'Administrador', activo: true },
  { id: 5, correo: 'cliente@gmail.com', contrasena: 'abcd', rol: 'Cliente', activo: true },
  { id: 6, correo: 'baja@gmail.com', contrasena: '1234', rol: 'Cliente', activo: false },
]

describe('autenticar', () => {
  it('devuelve el usuario cuando el correo y la contraseña coinciden', () => {
    const usuario = autenticar(usuarios, 'cliente@gmail.com', 'abcd')
    expect(usuario).not.toBeNull()
    expect(usuario.id).toBe(5)
    expect(esCliente(usuario)).toBe(true)
  })

  it('ignora mayúsculas y espacios en el correo', () => {
    expect(autenticar(usuarios, '  ADMIN@duoc.cl ', '1234')?.id).toBe(1)
  })

  it('rechaza una contraseña incorrecta o un correo que no existe', () => {
    expect(autenticar(usuarios, 'admin@duoc.cl', '9999')).toBeNull()
    expect(autenticar(usuarios, 'nadie@duoc.cl', '1234')).toBeNull()
  })

  it('no deja entrar a una cuenta desactivada', () => {
    expect(autenticar(usuarios, 'baja@gmail.com', '1234')).toBeNull()
  })
})

describe('obtenerSesion y guardarSesion', () => {
  // cada prueba parte con localStorage vacío y no deja datos para la siguiente
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('sin nada guardado no hay sesión', () => {
    expect(obtenerSesion()).toBeNull()
  })

  it('recuerda el id guardado y lo olvida al guardar null', () => {
    guardarSesion(5)
    expect(obtenerSesion()).toBe(5)
    guardarSesion(null)
    expect(obtenerSesion()).toBeNull()
  })
})
