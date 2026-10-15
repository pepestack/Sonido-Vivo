import { createContext, useContext, useEffect, useState } from 'react'
import * as carritoService from '../services/carritoService'

const CarritoContext = createContext(null)

export function CarritoProvider(props){
  const [items, setItems] = useState(() => carritoService.obtenerCarrito())

  useEffect(()=> {
    carritoService.guardarCarrito(items)
  },[items])

  function agregarAlCarrito(producto, cantidad = 1){
    setItems((actuales)=> carritoService.agregar(actuales,producto,cantidad))
  }

  function cambiarCantidad(id,cantidad){
    if(!Number.isInteger(cantidad) || cantidad < 1) return
    setItems((actuales) => carritoService.cambiarCantidad(actuales,id,cantidad))
  }

  function quitarDelCarrito(id){
    setItems((actuales)=> carritoService.quitar(actuales,id))
  }

  const valor={
    items,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
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