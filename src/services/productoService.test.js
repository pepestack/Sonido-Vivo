import { describe, it, expect } from 'vitest'
import { descontarStock } from './productoService'

describe('descontarStock', () => {
  const productos = [
    { id: 'GA001', stock: 5 },
    { id: 'AC001', stock: 1 },
    { id: 'MI001', stock: 8 },
  ]

  it('resta lo vendido, no baja de 0 y no toca los demás productos', () => {
    const resultado = descontarStock(productos, [
      { id: 'GA001', cantidad: 2 },
      { id: 'AC001', cantidad: 3 },
    ])

    expect(resultado.map((producto) => producto.stock)).toEqual([3, 0, 8])
    expect(resultado[2]).toBe(productos[2])
  })
})
