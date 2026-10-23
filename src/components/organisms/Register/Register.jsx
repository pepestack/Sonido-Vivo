import { CamposUsuario } from '../CamposUsuario/CamposUsuario'
import { TarjetaAutenticacion } from '../../molecules/TarjetaAutenticacion/TarjetaAutenticacion'
import { useFormulario } from '../../../hooks/useFormulario'
import { usuarioVacio } from '../../../data/usuarios'
import { normalizarUsuario } from '../../../services/usuarioService'
import { sinErrores, validarUsuario } from '../../../utils/validaciones'

// Organismo: registro público. Tiene los mismos campos y reglas que crear un usuario en el admin,
// pero sin elegir rol (la página lo asigna). Avisa a la página con props.onEnviar cuando todo es válido.
// regiones, comunasDe(region) y rutEnUso(rut) llegan por props
export function Register(props) {
  const formulario = useFormulario(usuarioVacio)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const valores = formulario.valores
    const nuevos = validarUsuario(valores, { rutEnUso: props.rutEnUso, ocultarRol: true })
    formulario.setErrores(nuevos)
    if (sinErrores(nuevos)) {
      props.onEnviar(normalizarUsuario(valores))
    }
  }

  return (
    <TarjetaAutenticacion
      titulo="Regístrate"
      textoBoton="Registrarse"
      pregunta="¿Ya tienes una cuenta?"
      textoEnlace="Iniciar sesión"
      ruta="/login"
      onNavegar={props.onNavegar}
      onEnviar={manejarEnvio}
    >
      <CamposUsuario
        formulario={formulario}
        regiones={props.regiones}
        comunasDe={props.comunasDe}
        ocultarRol
        compacto
      />
    </TarjetaAutenticacion>
  )
}
