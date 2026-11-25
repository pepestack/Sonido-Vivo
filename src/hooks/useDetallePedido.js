import { useEffect, useState } from 'react'
import { useSesion } from '../context/SesionContext'
import { mensajeErrorPedido, obtenerPedido } from '../services/pedidoService'
import { puedeGestionarPedidos } from '../utils/roles'

export function useDetallePedido(id, administracion = false) {
  const { usuario } = useSesion()
  const habilitado = Boolean(usuario && (!administracion || puedeGestionarPedidos(usuario)))
  const [consulta, setConsulta] = useState(null)

  useEffect(() => {
    if (!habilitado) return
    const peticion = new AbortController()
    obtenerPedido(id, peticion.signal)
      .then((pedido) => {
        if (!peticion.signal.aborted) setConsulta({ id, usuario, pedido })
      })
      .catch((error) => {
        if (!peticion.signal.aborted) setConsulta({ id, usuario, error: mensajeErrorPedido(error) })
      })
    return () => peticion.abort()
  }, [id, usuario, habilitado])

  const actual = habilitado && consulta?.id === id && consulta.usuario === usuario ? consulta : null
  return {
    pedido: actual?.pedido,
    error: actual?.error,
    cargando: habilitado && !actual,
    guardarPedido: (pedido) => setConsulta({ id, usuario, pedido }),
  }
}
