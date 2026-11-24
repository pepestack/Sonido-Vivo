import { describe, it, expect } from 'vitest'
import { validarUsuario } from './validaciones'

describe('validarUsuario', () => {
  const valido = {
    rut: '111111111',
    nombre: 'Ana',
    apellido: 'Pérez',
    correo: 'ana@duoc.cl',
    contrasena: '1234',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle 1',
    rol: 'Cliente',
  }

  it('exige el rol salvo que se oculte', () => {
    const sinRol = { ...valido, rol: '' }
    expect(validarUsuario(sinRol).rol).toBe('Selecciona un rol')
    expect(validarUsuario(sinRol, { ocultarRol: true }).rol).toBe('')
  })
})
