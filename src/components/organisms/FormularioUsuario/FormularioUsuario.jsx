import { useEffect } from 'react'
import { MensajeEstado } from '../../atoms/MensajeEstado/MensajeEstado'
import { TarjetaFormulario } from '../../molecules/TarjetaFormulario/TarjetaFormulario'
import { CamposUsuario } from '../CamposUsuario/CamposUsuario'
import { useFormulario } from '../../../hooks/useFormulario'
import { usuarioVacio } from '../../../data/usuarios'
import { normalizarUsuario } from '../../../utils/formato'
import { sinErrores, validarUsuario } from '../../../utils/validaciones'

// Formulario compartido para crear y editar usuarios en el admin.
// Con valoresIniciales es edición: el RUN y la contraseña no se muestran porque la API no los cambia.
// onEnviar(usuario): recibe el usuario validado y sin espacios sobrantes
// regiones, comunasDe(region) y roles llegan por props. La respuesta de la API llega en props.error
// (mensaje general) y props.erroresServidor ({ campo: mensaje }); props.cargando desactiva el botón
export function FormularioUsuario(props) {
  const formulario = useFormulario({ ...usuarioVacio, ...props.valoresIniciales })
  const valores = formulario.valores
  const setErrores = formulario.setErrores
  const edicion = Boolean(props.valoresIniciales)

  useEffect(() => {
    if (props.erroresServidor) setErrores((actuales) => ({ ...actuales, ...props.erroresServidor }))
  }, [props.erroresServidor, setErrores])

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = validarUsuario(valores, { edicion })
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
      cargando={props.cargando}
    >
      <CamposUsuario
        formulario={formulario}
        regiones={props.regiones}
        comunasDe={props.comunasDe}
        roles={props.roles}
        edicion={edicion}
      />
      <MensajeEstado tipo="error">{props.error}</MensajeEstado>
    </TarjetaFormulario>
  )
}
