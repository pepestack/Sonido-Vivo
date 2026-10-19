import { describe, it, expect } from 'vitest'
import { validarObligatorio } from './validaciones'

describe('validarObligatorio', () => {
  it('no devuelve error si el campo tiene texto', () => {
    expect(validarObligatorio('hola')).toBe('')
  })

  it('devuelve el mensaje por defecto si el campo está vacío', () => {
    expect(validarObligatorio('')).toBe('Este campo es obligatorio')
  })

  it('trata un campo con solo espacios como vacío', () => {
    expect(validarObligatorio('   ')).toBe('Este campo es obligatorio')
  })

  it('usa el mensaje propio si se le pasa uno', () => {
    expect(validarObligatorio('', 'Falta el RUT')).toBe('Falta el RUT')
  })
})
