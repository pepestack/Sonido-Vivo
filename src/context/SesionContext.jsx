import { createContext, useContext, useEffect, useState } from 'react'
import * as sesionService from '../services/sesionService'
import { useUsuarios } from './UsuariosContext'

const SesionContext = createContext(null)

export function SesionProvider(props) {
  const usuariosCtx = useUsuarios()
  const [usuarioId, setUsuarioId] = useState(() => sesionService.obtenerSesion())

  useEffect(() => {
    sesionService.guardarSesion(usuarioId)
  }, [usuarioId])

  // si el admin elimina o desactiva la cuenta, la sesión deja de valer
  const usuario = usuariosCtx.usuarios.find((actual) => actual.id === usuarioId && actual.activo) ?? null

  // devuelve el usuario si el correo y la contraseña corresponden a una cuenta activa; si no, null
  function iniciarSesion(correo, contrasena) {
    const encontrado = sesionService.autenticar(usuariosCtx.usuarios, correo, contrasena)
    if (encontrado) setUsuarioId(encontrado.id)
    return encontrado
  }

  function cerrarSesion() {
    setUsuarioId(null)
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
