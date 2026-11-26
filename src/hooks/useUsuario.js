import { useEffect, useState } from 'react'
import { obtenerMensajeError } from '../services/errores'
import { obtenerUsuario } from '../services/usuarioService'

// Pide un usuario a la API por su id. noEncontrado: la API respondió 404 (o el id no es válido)
export function useUsuario(id) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    let vigente = true
    async function cargar() {
      setCargando(true)
      setError('')
      setNoEncontrado(false)
      try {
        const datos = await obtenerUsuario(id)
        if (vigente) setUsuario(datos)
      } catch (error) {
        if (!vigente) return
        const estado = error.response?.status
        if (estado === 404 || estado === 400) setNoEncontrado(true)
        else setError(obtenerMensajeError(error))
      } finally {
        if (vigente) setCargando(false)
      }
    }
    cargar()
    return () => {
      vigente = false
    }
  }, [id])

  // setUsuario: para reflejar un cambio hecho en la página (por ejemplo, reactivar la cuenta)
  return { usuario, setUsuario, cargando, error, noEncontrado }
}
