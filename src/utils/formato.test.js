import { describe, it, expect } from 'vitest'
import { iniciales } from './formato'

describe('iniciales', () => {
  it('devuelve la inicial del nombre y del apellido', () => {
    expect(iniciales('Sebastian Navarro')).toBe('SN')
  })

  it('usa solo las 2 primeras palabras', () => {
    expect(iniciales('Ana María López')).toBe('AM')
  })

  it('ignora los espacios extra y pasa a mayúscula', () => {
    expect(iniciales('  ana   lopez ')).toBe('AL')
  })
})
