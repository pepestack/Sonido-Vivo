import { describe, it, expect } from 'vitest'
import { crearRegistroRequestDto } from './usuario.dto'

describe('crearRegistroRequestDto', () => {
  it('limpia el RUT, normaliza el correo y omite la fecha vacía', () => {
    const formulario = {
      rut: '12.345.678-k',
      nombre: ' Ana ',
      apellido: ' Rojas ',
      fechaNacimiento: '',
      correo: ' Ana@DuocUC.cl ',
      contrasena: '1234',
      region: 'Valparaíso',
      comuna: 'Viña del Mar',
      direccion: ' Av. Libertad 123 ',
    }

    expect(crearRegistroRequestDto(formulario)).toEqual({
      rut: '12345678K',
      nombre: 'Ana',
      apellido: 'Rojas',
      correo: 'ana@duocuc.cl',
      contrasena: '1234',
      region: 'Valparaíso',
      comuna: 'Viña del Mar',
      direccion: 'Av. Libertad 123',
    })
  })
})
