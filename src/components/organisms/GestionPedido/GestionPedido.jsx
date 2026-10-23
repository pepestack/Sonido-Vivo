import { Card } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'

// Panel lateral del comprobante en el admin: cambiar el estado, ver al cliente, imprimir y volver.
// onCambiarEstado(estado) recibe el estado elegido; sin onVerCliente no se muestra ese botón
export function GestionPedido(props) {
  return (
    <Card className="shadow-sm border-0 p-4">
      <Titulo nivel={2} className="h5 fw-bold mb-3">Gestión del pedido</Titulo>
      <CampoFormulario
        id="estado"
        etiqueta="Estado"
        tipo="select"
        opciones={props.opcionesEstado}
        valor={props.estado}
        onChange={(evento) => props.onCambiarEstado(evento.target.value)}
      />
      <div className="d-grid gap-2">
        {props.onVerCliente && (
          <Boton variante="outline-primary" onClick={props.onVerCliente}>
            Ver cliente
          </Boton>
        )}
        <Boton variante="outline-dark" onClick={props.onImprimir}>
          Imprimir boleta
        </Boton>
        <Boton variante="outline-secondary" onClick={props.onVolver}>
          Volver a pedidos
        </Boton>
      </div>
    </Card>
  )
}
