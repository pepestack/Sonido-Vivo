import { createContext, useContext, useEffect, useState } from 'react'
import * as categoriaService from '../services/categoriaService'
import { nombreCategoria as buscarNombre } from '../utils/formato'

const CategoriasContext = createContext(null)

export function CategoriasProvider(props) {
  const [categorias, setCategorias] = useState(() => categoriaService.obtenerCategorias())

  useEffect(() => {
    categoriaService.guardarCategorias(categorias)
  }, [categorias])

  function obtenerCategoria(valorCategoria) {
    return categorias.find((categoria) => categoria.valor === valorCategoria)
  }

  // nombre visible de una categoría, usando las categorías actuales (incluye las creadas por el admin)
  function nombreCategoria(valorCategoria) {
    return buscarNombre(valorCategoria, categorias)
  }

  function agregarCategoria(texto) {
    setCategorias((actuales) => categoriaService.agregar(actuales, texto))
  }

  function actualizarCategoria(valorCategoria, texto) {
    setCategorias((actuales) => categoriaService.actualizar(actuales, valorCategoria, texto))
  }

  function eliminarCategoria(valorCategoria) {
    setCategorias((actuales) => categoriaService.eliminar(actuales, valorCategoria))
  }

  const valor = { categorias, obtenerCategoria, nombreCategoria, agregarCategoria, actualizarCategoria, eliminarCategoria }

  return <CategoriasContext.Provider value={valor}>{props.children}</CategoriasContext.Provider>
}

export function useCategorias() {
  const contexto = useContext(CategoriasContext)
  if (!contexto) {
    throw new Error('useCategorias debe usarse dentro de un CategoriasProvider')
  }
  return contexto
}
