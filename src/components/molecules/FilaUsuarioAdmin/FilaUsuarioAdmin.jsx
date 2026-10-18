import { Boton } from '../../atoms/Boton/Boton'
import { Insignia } from '../../atoms/Insignia/Insignia'
import { colorRol } from '../../../utils/roles'
import { nombreCompleto } from '../../../utils/formato'

export function FilaUsuarioAdmin(props) {
  const usuario = props.usuario

  return (
    <tr>
      <td className="ps-4 fw-bold">{usuario.id}</td>
      <td>{nombreCompleto(usuario)}</td>
      <td>{usuario.correo}</td>
      <td>
        <Insignia color={colorRol[usuario.rol] ?? 'dark'}>{usuario.rol}</Insignia>
      </td>
      <td className="text-end pe-4">
        <Boton variante="outline-primary" tamano="sm" className="me-1" onClick={() => props.onVer(usuario)}>
          Ver usuario
        </Boton>
        <Boton variante="outline-primary" tamano="sm" onClick={() => props.onEditar(usuario)}>
          Editar
        </Boton>
        {props.puedeEliminar && (
          <Boton variante="outline-danger" tamano="sm" className="ms-1" onClick={() => props.onEliminar(usuario)}>
            Eliminar
          </Boton>
        )}
      </td>
    </tr>
  )
}