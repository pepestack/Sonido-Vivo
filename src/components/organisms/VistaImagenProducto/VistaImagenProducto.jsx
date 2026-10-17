import { Card } from 'react-bootstrap'
import { Imagen } from '../../atoms/Imagen/Imagen'
import { Texto } from '../../atoms/Texto/Texto'

export function VistaImagenProducto(props) {
  return (
    <Card className="border-0 shadow-sm p-4 text-center">
      <div className="bg-light rounded p-4 mb-3 d-flex align-items-center justify-content-center admin-img-caja">
        <Imagen src={props.imagen} alt={props.nombre} className="img-fluid rounded object-fit-cover" />
      </div>
      <Texto className="fw-semibold mb-0">Imagen principal</Texto>
      <Texto como="small" className="text-muted">
        {props.imagen ? props.nombre : 'Este producto aún no tiene imagen'}
      </Texto>
    </Card>
  )
}