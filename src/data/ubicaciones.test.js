import { describe, it, expect } from 'vitest'
import { comunasDe } from './ubicaciones'

describe('comunasDe', () => {
  it('devuelve las comunas de la región como opciones { valor, texto }', () => {
    const opciones = comunasDe('Región del Biobío')

    expect(opciones).toHaveLength(4)
    expect(opciones[0]).toEqual({ valor: 'Concepción', texto: 'Concepción' })
  })

  it('devuelve un arreglo vacío si no hay región elegida', () => {
    expect(comunasDe('')).toEqual([])
  })

  it('devuelve un arreglo vacío si la región no existe', () => {
    expect(comunasDe('Región de Marte')).toEqual([])
  })
})
