import { createContext, useContext, useEffect, useState } from 'react'
import * as pedidoService from '../services/pedidoService'
import { useCarrito } from './CarritoContext'
import { useProductos } from './ProductosContext'

const PedidosContext = createContext(null)

export function PedidosProvider(props) {
  const productosCtx = useProductos()
  const carrito = useCarrito()
  const [pedidos, setPedidos] = useState(() => pedidoService.obtenerPedidos())

  useEffect(() => {
    pedidoService.guardarPedidos(pedidos)
  }, [pedidos])

  function obtenerPedido(id) {
    return pedidos.find((pedido) => pedido.id === Number(id))
  }

  // Cierra la compra con lo que hay en el carrito. Si sale bien guarda el pedido,
  // descuenta el stock y vacía el carrito; si falla no cambia nada (el carrito se conserva).
  // Usa `pedidos` directo (no la forma funcional) porque la página necesita el resultado de inmediato
  function confirmarCompra(datos, numeroTarjeta) {
    const resultado = pedidoService.procesarCompra({
      pedidos,
      items: carrito.items,
      productos: productosCtx.productos,
      datos,
      numeroTarjeta,
    })
    if (resultado.ok) {
      setPedidos(resultado.pedidos)
      productosCtx.descontarStock(resultado.pedido.items)
      carrito.vaciarCarrito()
    }
    return resultado
  }

  function cambiarEstado(id, estado) {
    setPedidos((actuales) => pedidoService.cambiarEstado(actuales, Number(id), estado))
  }

  const valor = { pedidos, obtenerPedido, confirmarCompra, cambiarEstado }

  return <PedidosContext.Provider value={valor}>{props.children}</PedidosContext.Provider>
}

// Hook propio: pedidos y acciones sobre ellos. Uso: const pedidosCtx = usePedidos()
export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  }
  return contexto
}
