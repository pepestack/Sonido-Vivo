import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { TarjetaAutenticacion } from '../../molecules/TarjetaAutenticacion/TarjetaAutenticacion'
import { useFormulario } from '../../../hooks/useFormulario'
import { sinErrores, validarClave, validarEmail, validarObligatorio } from '../../../utils/validaciones'

export function Register(props) {
  const formulario = useFormulario({ email: '', username: '', contrasena: '' })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const valores = formulario.valores
    const nuevos = {
      email: validarEmail(valores.email),
      username: validarObligatorio(valores.username, 'El nombre de usuario es requerido'),
      contrasena: validarClave(valores.contrasena),
    }
    formulario.setErrores(nuevos)
    if (sinErrores(nuevos)) {
      props.onEnviar({ email: valores.email.trim(), username: valores.username.trim() })
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
        id="username"
        etiqueta="Nombre de usuario"
        placeholder="Ej: seba_music"
        valor={formulario.valores.username}
        onChange={formulario.manejarCambio}
        error={formulario.errores.username}
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
