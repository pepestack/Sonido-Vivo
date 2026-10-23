import { describe, it, expect } from 'vitest'
import { conCantidades } from './categoriaService'

describe('categoriaService', () => {
  const categorias = [
    { valor: 'baterias', texto: 'Baterías' },
    { valor: 'microfonos', texto: 'Micrófonos' },
  ]

  it('conCantidades cuenta los productos de cada categoría', () => {
    const productos = [{ categoria: 'baterias' }, { categoria: 'baterias' }, { categoria: 'otra' }]

    expect(conCantidades(categorias, productos).map((categoria) => categoria.cantidad)).toEqual([2, 0])
  })
})
