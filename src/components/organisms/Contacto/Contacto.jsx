import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { MensajeEstado } from '../../atoms/MensajeEstado/MensajeEstado'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { useFormulario } from '../../../hooks/useFormulario'
import {
  LARGO_MAXIMO_CORREO,
  sinErrores,
  validarCorreoOpcional,
  validarLargoMaximo,
  validarObligatorio,
} from '../../../utils/validaciones'

const claseEtiqueta = 'small fw-bold text-muted'
const LARGO_MAXIMO_NOMBRE = 100
const LARGO_MAXIMO_COMENTARIO = 500

export function Contacto(props) {
  const formulario = useFormulario({ nombre: '', correo: '', contenido: '' })
  const [enviado, setEnviado] = useState(false)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const valores = formulario.valores
    const nuevos = {
      nombre:
        validarObligatorio(valores.nombre, 'El nombre es requerido') ||
        validarLargoMaximo(valores.nombre, LARGO_MAXIMO_NOMBRE),
      correo: validarCorreoOpcional(valores.correo),
      contenido:
        validarObligatorio(valores.contenido, 'El comentario es requerido') ||
        validarLargoMaximo(valores.contenido, LARGO_MAXIMO_COMENTARIO),
    }
    formulario.setErrores(nuevos)
    setEnviado(false)
    if (!sinErrores(nuevos)) return

    props.onEnviar?.(valores)
    setEnviado(true)
    formulario.reiniciar()
  }

  return (
    <Card as="article" className="shadow border-0 my-4">
      <Card.Header as="header" className="text-center custom-lb-container text-dark py-3 border-bottom">
        <Titulo nivel={2} className="mb-0 h5 fw-bold text-dark">
          Contáctanos
        </Titulo>
      </Card.Header>
      <Card.Body className="p-4">
        <Form noValidate onSubmit={manejarEnvio}>
          <CampoFormulario
            id="nombre"
            etiqueta="Nombre Completo"
            requerido
            maxLength={LARGO_MAXIMO_NOMBRE}
            valor={formulario.valores.nombre}
            onChange={formulario.manejarCambio}
            error={formulario.errores.nombre}
            claseEtiqueta={claseEtiqueta}
          />
          <CampoFormulario
            id="correo"
            etiqueta="Correo"
            tipo="email"
            maxLength={LARGO_MAXIMO_CORREO}
            valor={formulario.valores.correo}
            onChange={formulario.manejarCambio}
            error={formulario.errores.correo}
            claseEtiqueta={claseEtiqueta}
          />
          <CampoFormulario
            id="contenido"
            etiqueta="Comentario"
            tipo="textarea"
            requerido
            filas={4}
            maxLength={LARGO_MAXIMO_COMENTARIO}
            valor={formulario.valores.contenido}
            onChange={formulario.manejarCambio}
            error={formulario.errores.contenido}
            claseEtiqueta={claseEtiqueta}
          />
          <div className="d-grid mt-4">
            <Boton tipo="submit" className="text-white fw-bold py-2">
              Enviar Mensaje
            </Boton>
          </div>
          <MensajeEstado className="mt-3 text-center sonido">{enviado && '¡Mensaje enviado!'}</MensajeEstado>
        </Form>
      </Card.Body>
    </Card>
  )
}
