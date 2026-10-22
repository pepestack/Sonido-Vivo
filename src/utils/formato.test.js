import { describe, it, expect } from 'vitest'
import { generarValor, iniciales, nombreCategoria, numeroPedido } from './formato'

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

describe('numeroPedido', () => {
  it('rellena con ceros hasta 6 dígitos', () => {
    expect(numeroPedido(12)).toBe('#000012')
    expect(numeroPedido(1234567)).toBe('#1234567')
  })
})

describe('generarValor', () => {
  it('pasa a minúsculas, quita tildes y cambia espacios por guiones', () => {
    expect(generarValor('Guitarras Acústicas')).toBe('guitarras-acusticas')
  })

  it('junta espacios y símbolos en un solo guion y no deja guiones en los bordes', () => {
    expect(generarValor('  Pedales & Efectos! ')).toBe('pedales-efectos')
  })
})

describe('nombreCategoria', () => {
  const lista = [{ valor: 'vientos', texto: 'Instrumentos de Viento' }]

  it('busca el nombre en la lista que recibe', () => {
    expect(nombreCategoria('vientos', lista)).toBe('Instrumentos de Viento')
  })

  it('si la categoría no existe, devuelve el valor tal cual', () => {
    expect(nombreCategoria('no-existe', lista)).toBe('no-existe')
  })
})
