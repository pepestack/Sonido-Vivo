import { AccionesFila } from '../AccionesFila/AccionesFila'
import { InsigniaRol } from '../InsigniaRol/InsigniaRol'
import { nombreCompleto } from '../../../utils/formato'

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
      <AccionesFila
        onVer={() => props.onVer(usuario)}
        textoVer="Ver usuario"
        onEditar={() => props.onEditar(usuario)}
        onEliminar={props.puedeEliminar ? () => props.onEliminar(usuario) : undefined}
      />
    </tr>
  )
}
