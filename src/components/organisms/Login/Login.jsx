import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { TarjetaAutenticacion } from '../../molecules/TarjetaAutenticacion/TarjetaAutenticacion'
import { useFormulario } from '../../../hooks/useFormulario'
import { sinErrores, validarClave, validarEmail } from '../../../utils/validaciones'

// Organismo: dueño del estado y de los errores. Solo avisa a la página (props.onEnviar) cuando todos los campos son válidos.
export function Login(props) {
  const formulario = useFormulario({ email: '', contrasena: '' })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = {
      email: validarEmail(formulario.valores.email),
      contrasena: validarClave(formulario.valores.contrasena),
    }
    formulario.setErrores(nuevos)
    if (sinErrores(nuevos)) {
      props.onEnviar({ email: formulario.valores.email.trim() })
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
        placeholder="Sebastian@ejemplo.com"
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
        valor={formulario.valores.contrasena}
        onChange={formulario.manejarCambio}
        error={formulario.errores.contrasena}
        claseEtiqueta="form-label"
        className=""
      />
    </TarjetaAutenticacion>
  )
}
