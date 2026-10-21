import { describe, it, expect } from 'vitest'
import { agregar, calcularTotales, COSTO_DESPACHO, MAXIMO_POR_COMPRA } from './carritoService'

const items = [
  { id: 'GA001', nombre: 'Guitarra', precio: 100000, stock: 5, cantidad: 1 },
  { id: 'AC001', nombre: 'Cuerdas', precio: 5000, stock: 10, cantidad: 2 },
]

describe('calcularTotales', () => {
  it('suma unidades, subtotal y cobra despacho por defecto', () => {
    expect(calcularTotales(items)).toEqual({
      totalItems: 3,
      subtotal: 110000,
      despacho: COSTO_DESPACHO,
      total: 110000 + COSTO_DESPACHO,
    })
  })

  it('no cobra despacho con retiro en tienda', () => {
    const totales = calcularTotales(items, 'retiro')
    expect(totales.despacho).toBe(0)
    expect(totales.total).toBe(110000)
  })

  it('con el carrito vacío no cobra despacho', () => {
    expect(calcularTotales([]).total).toBe(0)
  })
})

describe('agregar', () => {
  it('no supera el máximo por compra', () => {
    const producto = { id: 'X', nombre: 'X', precio: 1, stock: 50 }
    const resultado = agregar([], producto, 99)
    expect(resultado[0].cantidad).toBe(MAXIMO_POR_COMPRA)
  })
})
