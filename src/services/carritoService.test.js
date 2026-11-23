import { describe, it, expect } from 'vitest'
import { calcularTotales } from './carritoService'

const items = [
  { id: 'GA001', nombre: 'Guitarra', precio: 100000, stock: 5, cantidad: 1 },
  { id: 'AC001', nombre: 'Cuerdas', precio: 5000, stock: 10, cantidad: 2 },
]

describe('calcularTotales', () => {
  it('suma unidades, subtotal y cobra despacho por defecto', () => {
    expect(calcularTotales(items)).toEqual({
      totalItems: 3,
      subtotal: 110000,
      despacho: 6767,
      total: 116767,
    })
  })
})

