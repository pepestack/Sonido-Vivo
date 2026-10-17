import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Enlace } from '../../atoms/Enlace/Enlace'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Molécula: marco común de login y registro.
// Los campos llegan como children; el estado y la validación quedan en cada organismo.
export function TarjetaAutenticacion(props) {
  return (
    <Card className="shadow-sm mt-4">
      <Card.Body className="p-4 custom-lb-container">
        <Titulo nivel={2} className="text-center">
          {props.titulo}
        </Titulo>
        <Form noValidate onSubmit={props.onEnviar}>
          {props.children}
          <div className="text-center mt-1">
            <Boton tipo="submit" className="w-100 mt-3">
              {props.textoBoton}
            </Boton>
          </div>
        </Form>
        <div className="text-center mt-3">
          <Texto className="mb-0">
            {props.pregunta}{' '}
            <Enlace ruta={props.ruta} onNavegar={props.onNavegar} className="text-decoration-none">
              {props.textoEnlace}
            </Enlace>
          </Texto>
        </div>
      </Card.Body>
    </Card>
  )
}
