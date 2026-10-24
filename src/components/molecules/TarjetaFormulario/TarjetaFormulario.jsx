import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Molécula: marco común de los formularios del admin (crear y editar).
// Los campos llegan como children; el estado y la validación quedan en cada organismo.
export function TarjetaFormulario(props) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <Titulo nivel={1} className="h3 fw-bold mb-4 text-primary">
          {props.titulo}
        </Titulo>
        <Form noValidate onSubmit={props.onEnviar}>
          {props.children}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Boton variante="outline-secondary" onClick={props.onCancelar}>
              {props.textoCancelar ?? 'Cancelar'}
            </Boton>
            <Boton variante="success" tipo="submit" className="px-4">
              {props.textoGuardar ?? 'Guardar'}
            </Boton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
