import { createContext, useContext, useEffect, useState } from 'react'
import * as carritoService from '../services/carritoService'
import { useProductos } from './ProductosContext'

const CarritoContext = createContext(null)

export function CarritoProvider(props){
  const productosCtx = useProductos()
  const [guardados, setGuardados] = useState(() => carritoService.obtenerCarrito())

  useEffect(()=> {
    carritoService.guardarCarrito(guardados)
  },[guardados])

  // lo guardado puede quedar desfasado si el admin borra o edita un producto,
  // por eso el carrito que se muestra siempre se alinea con el inventario actual
  const items = carritoService.sincronizar(guardados, productosCtx.productos)

  function alinear(actuales){
    return carritoService.sincronizar(actuales, productosCtx.productos)
  }

  function agregarAlCarrito(producto, cantidad = 1){
    setGuardados((actuales)=> carritoService.agregar(alinear(actuales),producto,cantidad))
  }

  function cambiarCantidad(id,cantidad){
    if(!Number.isInteger(cantidad) || cantidad < 1) return
    setGuardados((actuales) => carritoService.cambiarCantidad(alinear(actuales),id,cantidad))
  }

  function quitarDelCarrito(id){
    setGuardados((actuales)=> carritoService.quitar(alinear(actuales),id))
  }

  function cantidadEnCarrito(id){
    const item = items.find((actual) => actual.id === id)
    return item ? item.cantidad : 0
  }

  const valor={
    items,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    cantidadEnCarrito,
    ...carritoService.calcularTotales(items)
  }

  return <CarritoContext.Provider value={valor}>{props.children}</CarritoContext.Provider>
}

// Hook propio: abre la caja del carrito. Uso: const carrito = useCarrito()
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  return contexto
}
