import { Etiqueta } from '../../atoms/Etiqueta/Etiqueta'
import { Selector } from '../../atoms/Selector/Selector'

// valor 'todos' = sin filtro. estados: ['En preparación', ...]
export function FiltroEstado(props) {
  const opciones = [
    { valor: 'todos', texto: 'Todos los estados' },
    ...props.estados.map((estado) => ({ valor: estado, texto: estado })),
  ]

  return (
    <div className="d-flex align-items-center justify-content-md-end">
      <Etiqueta htmlFor="filtro-estado" className="me-2 mb-0">
        Estado:
      </Etiqueta>
      <Selector
        id="filtro-estado"
        valor={props.valor}
        onChange={(evento) => props.onCambiar(evento.target.value)}
        opciones={opciones}
        className="w-auto"
      />
    </div>
  )
}
