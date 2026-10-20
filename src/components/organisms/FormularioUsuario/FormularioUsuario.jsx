import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CamposUsuario } from '../CamposUsuario/CamposUsuario'
import { useFormulario } from '../../../hooks/useFormulario'
import { usuarioVacio } from '../../../data/usuarios'
import { sinErrores, validarUsuario } from '../../../utils/validaciones'

// Formulario compartido para crear y editar usuarios en el admin.
// rutEnUso(rut): indica si el RUT ya pertenece a otro usuario
// onEnviar(usuario): recibe el usuario validado y sin espacios sobrantes
// regiones, comunasDe(region) y roles llegan por props
export function FormularioUsuario(props) {
  const formulario = useFormulario(props.valoresIniciales ?? usuarioVacio)
  const valores = formulario.valores

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = validarUsuario(valores, { rutEnUso: props.rutEnUso })
    formulario.setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    props.onEnviar({
      ...valores,
      rut: valores.rut.trim(),
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim(),
      direccion: valores.direccion.trim(),
    })
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <Titulo nivel={2} className="h3 fw-bold mb-4 text-primary">
          {props.titulo}
        </Titulo>
        <Form noValidate onSubmit={manejarEnvio}>
          <CamposUsuario
            formulario={formulario}
            regiones={props.regiones}
            comunasDe={props.comunasDe}
            roles={props.roles}
          />

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Boton variante="outline-secondary" onClick={props.onCancelar}>
              {props.textoCancelar ?? 'Cancelar'}
            </Boton>
            <Boton variante="success" tipo="submit" className="px-4">
              Guardar Usuario
            </Boton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
