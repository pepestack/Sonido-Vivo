import { Boton } from '../../atoms/Boton/Boton'

// Celda de acciones de las tablas del admin. Cada botón solo aparece si llega su función
export function AccionesFila(props) {
  const botones = [
    props.onVer && { texto: props.textoVer ?? 'Ver detalle', variante: 'outline-primary', accion: props.onVer },
    props.onEditar && { texto: 'Editar', variante: 'outline-primary', accion: props.onEditar },
    props.onEliminar && { texto: props.textoEliminar ?? 'Eliminar', variante: 'outline-danger', accion: props.onEliminar },
    props.onReactivar && { texto: 'Reactivar', variante: 'outline-success', accion: props.onReactivar },
  ].filter(Boolean)

  return (
    <td className="text-end pe-4">
      {botones.map((boton, indice) => (
        <Boton
          key={boton.texto}
          variante={boton.variante}
          tamano="sm"
          className={indice > 0 ? 'ms-1' : ''}
          onClick={boton.accion}
        >
          {boton.texto}
        </Boton>
      ))}
    </td>
  )
}
