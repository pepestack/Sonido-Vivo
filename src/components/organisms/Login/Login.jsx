import { MensajeEstado } from '../../atoms/MensajeEstado/MensajeEstado'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { TarjetaAutenticacion } from '../../molecules/TarjetaAutenticacion/TarjetaAutenticacion'
import { useFormulario } from '../../../hooks/useFormulario'
import {
  LARGO_MAXIMO_CLAVE,
  LARGO_MAXIMO_CORREO,
  sinErrores,
  validarClave,
  validarCorreoPermitido,
  validarObligatorio,
} from '../../../utils/validaciones'

// Organismo: dueño del estado y de los errores. Solo avisa a la página (props.onEnviar) cuando todos los campos son válidos.
// props.error: mensaje de la página cuando las credenciales no corresponden a ningún usuario
export function Login(props) {
  const formulario = useFormulario({ email: '', contrasena: '' })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = {
      email: validarObligatorio(formulario.valores.email, 'El correo es requerido') || validarCorreoPermitido(formulario.valores.email),
      contrasena: validarClave(formulario.valores.contrasena),
    }
    formulario.setErrores(nuevos)
    if (sinErrores(nuevos)) {
      props.onEnviar({ email: formulario.valores.email.trim(), contrasena: formulario.valores.contrasena })
    }
  }

  return (
    <TarjetaAutenticacion
      titulo="Iniciar sesión"
      textoBoton="Ingresar"
      pregunta="¿No tienes cuenta?"
      textoEnlace="Regístrate"
      ruta="/registro"
      onNavegar={props.onNavegar}
      onEnviar={manejarEnvio}
    >
      <CampoFormulario
        id="email"
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="usuario@duoc.cl"
        maxLength={LARGO_MAXIMO_CORREO}
        valor={formulario.valores.email}
        onChange={formulario.manejarCambio}
        error={formulario.errores.email}
        claseEtiqueta="form-label"
      />
      <CampoFormulario
        id="contrasena"
        etiqueta="Contraseña"
        tipo="password"
        placeholder="*******"
        maxLength={LARGO_MAXIMO_CLAVE}
        valor={formulario.valores.contrasena}
        onChange={formulario.manejarCambio}
        error={formulario.errores.contrasena}
        claseEtiqueta="form-label"
        className=""
      />
      <MensajeEstado tipo="error">{props.error}</MensajeEstado>
    </TarjetaAutenticacion>
  )
}
