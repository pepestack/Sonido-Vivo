import { Etiqueta } from '../../atoms/Etiqueta/Etiqueta'
import { Selector } from '../../atoms/Selector/Selector'

// Etiqueta y selector en una sola línea (filtros, cantidad). onCambiar recibe el valor elegido (string)
export function SelectorEnLinea(props) {
  return (
    <div className={`d-flex align-items-center ${props.className ?? ''}`.trim()}>
      <Etiqueta htmlFor={props.id} className="me-2 mb-0">
        {props.etiqueta}
      </Etiqueta>
      <Selector
        id={props.id}
        valor={props.valor}
        onChange={(evento) => props.onCambiar(evento.target.value)}
        opciones={props.opciones}
        className="w-auto"
      />
    </div>
  )
}
