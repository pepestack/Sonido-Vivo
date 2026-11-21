import { createContext, useContext, useEffect, useState } from 'react'
import { alExpirarSesion } from '../services/api'
import * as sesionService from '../services/sesionService'

const SesionContext = createContext(null)

export function SesionProvider(props) {
  const [sesion, setSesion] = useState(() => sesionService.obtenerSesion())

  // se guarda antes de actualizar el estado: así la primera petición de la página siguiente ya lleva el token
  function cambiarSesion(nueva) {
    sesionService.guardarSesion(nueva)
    setSesion(nueva)
  }

  // si la API rechaza el token (expiró o la cuenta se desactivó), la sesión se cierra
  useEffect(() => {
    alExpirarSesion(() => cambiarSesion(null))
    return () => alExpirarSesion(null)
  }, [])

  const usuario = sesion?.usuario ?? null

  // devuelve el usuario si la API acepta las credenciales; si no, lanza el error de Axios
  async function iniciarSesion(correo, contrasena) {
    const datos = await sesionService.iniciarSesion(correo, contrasena)
    const nuevoUsuario = { ...datos.usuario, activo: true }
    cambiarSesion({ token: datos.accessToken, usuario: nuevoUsuario })
    return nuevoUsuario
  }

  function cerrarSesion() {
    cambiarSesion(null)
  }

  const valor = { usuario, iniciarSesion, cerrarSesion }

  return <SesionContext.Provider value={valor}>{props.children}</SesionContext.Provider>
}

// Hook propio: usuario con sesión iniciada (o null). Uso: const sesion = useSesion()
export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider')
  }
  return contexto
}
