import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../services/usuarioService'

const UsuariosContext = createContext(null)

export function UsuariosProvider(props) {
  const [usuarios, setUsuarios] = useState(() => usuarioService.obtenerUsuarios())

  // cada cambio pasa por el service (hoy no persiste; mañana localStorage)
  useEffect(() => {
    usuarioService.guardarUsuarios(usuarios)
  }, [usuarios])

  function obtenerUsuario(id) {
    return usuarios.find((usuario) => usuario.id === Number(id))
  }

  function agregarUsuario(nuevo) {
    setUsuarios((actuales) => usuarioService.agregar(actuales, nuevo))
  }

  function actualizarUsuario(id, cambios) {
    setUsuarios((actuales) => usuarioService.actualizar(actuales, Number(id), cambios))
  }

  function eliminarUsuario(id) {
    setUsuarios((actuales) => usuarioService.eliminar(actuales, Number(id)))
  }

  const valor = { usuarios, obtenerUsuario, agregarUsuario, actualizarUsuario, eliminarUsuario }

  return <UsuariosContext.Provider value={valor}>{props.children}</UsuariosContext.Provider>
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) {
    throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  }
  return contexto
}

