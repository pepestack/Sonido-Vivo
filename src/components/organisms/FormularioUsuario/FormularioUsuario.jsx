import { TarjetaFormulario } from '../../molecules/TarjetaFormulario/TarjetaFormulario'
import { CamposUsuario } from '../CamposUsuario/CamposUsuario'
import { useFormulario } from '../../../hooks/useFormulario'
import { usuarioVacio } from '../../../data/usuarios'
import { normalizarUsuario } from '../../../utils/formato'
import { sinErrores, validarUsuario } from '../../../utils/validaciones'

// Formulario compartido para crear y editar usuarios en el admin.
// rutEnUso(rut) y correoEnUso(correo): indican si el RUT o el correo ya pertenecen a otro usuario
// onEnviar(usuario): recibe el usuario validado y sin espacios sobrantes
// regiones, comunasDe(region) y roles llegan por props
export function FormularioUsuario(props) {
  const formulario = useFormulario(props.valoresIniciales ?? usuarioVacio)
  const valores = formulario.valores

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = validarUsuario(valores, { rutEnUso: props.rutEnUso, correoEnUso: props.correoEnUso })
    formulario.setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    props.onEnviar(normalizarUsuario(valores))
  }

  return (
    <TarjetaFormulario
      titulo={props.titulo}
      textoGuardar="Guardar Usuario"
      textoCancelar={props.textoCancelar}
      onEnviar={manejarEnvio}
      onCancelar={props.onCancelar}
    >
      <CamposUsuario
        formulario={formulario}
        regiones={props.regiones}
        comunasDe={props.comunasDe}
        roles={props.roles}
      />
    </TarjetaFormulario>
  )
}
