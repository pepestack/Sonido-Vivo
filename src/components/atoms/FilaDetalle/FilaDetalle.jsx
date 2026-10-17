// Fila "etiqueta | valor" de una tabla de detalle
export function FilaDetalle(props) {
  return (
    <tr>
      <th scope="row" className="w-25 text-secondary fw-normal">
        {props.etiqueta}
      </th>
      <td>{props.children}</td>
    </tr>
  )
}
