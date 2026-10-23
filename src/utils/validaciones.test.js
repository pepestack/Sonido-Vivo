import { describe, it, expect } from 'vitest'
import { sinErrores, validarCategoria, validarUsuario } from './validaciones'

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

  it('no devuelve errores para un usuario válido', () => {
    expect(sinErrores(validarUsuario(valido))).toBe(true)
  })

  it('exige el rol salvo que se oculte', () => {
    const sinRol = { ...valido, rol: '' }
    expect(validarUsuario(sinRol).rol).toBe('Selecciona un rol')
    expect(validarUsuario(sinRol, { ocultarRol: true }).rol).toBe('')
  })
})

describe('validarCategoria', () => {
  it('rechaza un nombre cuyo valor ya usa otra categoría', () => {
    const enUso = (valor) => valor === 'baterias'
    expect(validarCategoria('Baterías', enUso)).toBe('Ya existe una categoría con ese nombre')
  })
})
