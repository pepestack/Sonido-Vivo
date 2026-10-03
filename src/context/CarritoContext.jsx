import { useEffect, useState } from 'react'
import { CarritoContext } from './contextos'
import * as carritoService from '../services/carritoService'

export default function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => carritoService.obtenerCarrito())

  // cada cambio pasa por el service (hoy no persiste; mañana localStorage)
  useEffect(() => {
    carritoService.guardarCarrito(items)
  }, [items])

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setItems((actuales) => carritoService.agregar(actuales, producto, cantidad))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (!Number.isInteger(cantidad) || cantidad < 1) return
    setItems((actuales) => carritoService.cambiarCantidad(actuales, id, cantidad))
  }

  const quitarDelCarrito = (id) => {
    setItems((actuales) => carritoService.quitar(actuales, id))
  }

  const valor = {
    items,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    ...carritoService.calcularTotales(items),
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}
