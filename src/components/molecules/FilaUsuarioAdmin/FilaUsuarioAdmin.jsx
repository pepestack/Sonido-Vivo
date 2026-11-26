import { Texto } from '../../atoms/Texto/Texto'
import { AccionesFila } from '../AccionesFila/AccionesFila'
import { InsigniaRol } from '../InsigniaRol/InsigniaRol'
import { nombreCompleto } from '../../../utils/formato'

// Una cuenta activa se puede desactivar (si puedeEliminar); una inactiva, reactivar
export function FilaUsuarioAdmin(props) {
  const usuario = props.usuario

  return (
    <tr>
      <td className="ps-4 fw-bold">{usuario.id}</td>
      <td>{nombreCompleto(usuario)}</td>
      <td>{usuario.correo}</td>
      <td>
        <InsigniaRol rol={usuario.rol} />
      </td>
      <td>
        <Texto como="span" className={`fw-bold ${usuario.activo ? 'text-success' : 'text-danger'}`}>
          {usuario.activo ? 'Activo' : 'Inactivo'}
        </Texto>
      </td>
      <AccionesFila
        onVer={() => props.onVer(usuario)}
        textoVer="Ver usuario"
        onEditar={() => props.onEditar(usuario)}
        textoEliminar="Desactivar"
        onEliminar={usuario.activo && props.puedeEliminar ? () => props.onEliminar(usuario) : undefined}
        onReactivar={!usuario.activo ? () => props.onReactivar(usuario) : undefined}
      />
    </tr>
  )
}
