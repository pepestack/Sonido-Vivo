import { Insignia } from '../../atoms/Insignia/Insignia'
import { colorRol } from '../../../utils/roles'

// Rol de un usuario con su color (el mismo en las tablas y en el perfil)
export function InsigniaRol(props) {
  return (
    <Insignia color={colorRol[props.rol] ?? 'dark'} className={props.className}>
      {props.rol}
    </Insignia>
  )
}
