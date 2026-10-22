import { describe, it, expect } from 'vitest'
import { actualizar, agregar, conCantidades, eliminar } from './categoriaService'

describe('categoriaService', () => {
  const categorias = [
    { valor: 'baterias', texto: 'Baterías' },
    { valor: 'microfonos', texto: 'Micrófonos' },
  ]

  it('agregar arma el valor desde el nombre y no modifica el arreglo original', () => {
    const resultado = agregar(categorias, ' Instrumentos de Viento ')

    expect(resultado).toHaveLength(3)
    expect(resultado[2]).toEqual({ valor: 'instrumentos-de-viento', texto: 'Instrumentos de Viento' })
    expect(categorias).toHaveLength(2)
  })

  it('actualizar cambia solo el nombre y mantiene el valor', () => {
    const resultado = actualizar(categorias, 'baterias', 'Baterías y Percusión')

    expect(resultado[0]).toEqual({ valor: 'baterias', texto: 'Baterías y Percusión' })
    expect(resultado[1]).toBe(categorias[1])
  })

  it('eliminar quita la categoría con ese valor', () => {
    expect(eliminar(categorias, 'baterias')).toEqual([{ valor: 'microfonos', texto: 'Micrófonos' }])
  })

  it('conCantidades cuenta los productos de cada categoría', () => {
    const productos = [{ categoria: 'baterias' }, { categoria: 'baterias' }, { categoria: 'otra' }]

    expect(conCantidades(categorias, productos).map((categoria) => categoria.cantidad)).toEqual([2, 0])
  })
})
