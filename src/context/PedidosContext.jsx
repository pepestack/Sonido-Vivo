import { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as pedidoService from '../services/pedidoService'
import { puedeGestionarPedidos } from '../utils/roles'
import { useCarrito } from './CarritoContext'
import { useProductos } from './ProductosContext'
import { useSesion } from './SesionContext'

const PedidosContext = createContext(null)

export function PedidosProvider(props) {
  const { usuario } = useSesion()
  const { items, vaciarCarrito } = useCarrito()
  const { recargar } = useProductos()
  const [consulta, setConsulta] = useState(null)
  const [revision, setRevision] = useState(0)
  const [comprobante, setComprobante] = useState(null)
  const [comprando, setComprando] = useState(false)
  const compraEnCurso = useRef(false)
  const puedeConsultar = usuario?.rol === 'Cliente' || puedeGestionarPedidos(usuario)

  useEffect(() => {
    if (!puedeConsultar) return
    const peticion = new AbortController()
    pedidoService.listarPedidos(peticion.signal)
      .then((pedidos) => {
        if (!peticion.signal.aborted) setConsulta({ usuario, revision, pedidos })
      })
      .catch((error) => {
        if (!peticion.signal.aborted) {
          setConsulta({ usuario, revision, error: pedidoService.mensajeErrorPedido(error) })
        }
      })
    return () => peticion.abort()
  }, [usuario, puedeConsultar, revision])

  function actualizarListado() {
    setRevision((actual) => actual + 1)
  }

  async function confirmarCompra(datos) {
    if (compraEnCurso.current) return null
    compraEnCurso.current = true
    setComprando(true)
    try {
      const pedido = await pedidoService.crearPedido(items, datos)
      setComprobante({ usuario, pedido })
      vaciarCarrito()
      void recargar()
      if (usuario) actualizarListado()
      return pedido
    } finally {
      compraEnCurso.current = false
      setComprando(false)
    }
  }

  const consultaActual = consulta && consulta.usuario === usuario && consulta.revision === revision ? consulta : null

  return (
    <PedidosContext.Provider value={{
      pedidos: consultaActual?.pedidos ?? [],
      cargandoPedidos: puedeConsultar && !consultaActual,
      errorPedidos: consultaActual?.error,
      comprobante: comprobante && comprobante.usuario === usuario ? comprobante.pedido : null,
      confirmarCompra,
      comprando,
      actualizarListado,
    }}>
      {props.children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  return contexto
}
